import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    const alphabetRegex = /^[a-zA-Z]+$/;

    if (!alphabetRegex.test(key)) {
      setError("Kunci hanya boleh terdiri dari huruf alfabet (A-Z atau a-z).");
      setResult("");
      return;
    }

    if (!/[a-zA-Z]/.test(text)) {
      setError("Teks harus mengandung setidaknya satu huruf alfabet.");
      setResult("");
      return;
    }

    setError(""); // reset error jika validasi lolos
    const url = `http://127.0.0.1:5000/${mode}`;

    try {
      const res = await axios.post(url, { text, key });
      setResult(res.data.result);
    } catch (err) {
      console.error("Error saat memproses:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
      setResult("");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="my-5 flex-grow-1">
        <Card className="shadow p-4">
          <Card.Body>
            <img src="/cropped-Logo-UBSI.png" alt="Logo" className="mb-4 mx-auto d-block" style={{ width: '100px' }} />
            <h2 className="mb-4 text-center">Vigenère Cipher App</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label><strong>Plaintext / Ciphertext</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan teks..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label><strong>Kunci</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan kunci..."
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label><strong>Mode</strong></Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Enkripsi"
                    name="mode"
                    value="encrypt"
                    checked={mode === "encrypt"}
                    onChange={() => setMode("encrypt")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Dekripsi"
                    name="mode"
                    value="decrypt"
                    checked={mode === "decrypt"}
                    onChange={() => setMode("decrypt")}
                  />
                </div>
              </Form.Group>

              <div className="d-grid mt-4">
                <Button variant="primary" type="submit">Proses</Button>
              </div>
            </Form>

            {/* Alert untuk Error */}
            {error && (
              <Alert className="mt-4" variant="danger">
                <strong>Kesalahan:</strong> {error}
              </Alert>
            )}

            {/* Alert untuk Hasil */}
            {result && (
              <Alert className="mt-4" variant="success">
                <strong>Hasil:</strong> {result}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>

      <footer className="bg-dark text-light text-center py-3 mt-auto">
        <div>
          Dibuat oleh <strong>Kelompok Tujuh</strong> – Mata Kuliah <strong>Kriptografi</strong><br />
          Universitas Bina Sarana Informatika – 2025
        </div>
      </footer>
    </div>
  );
}

export default App;
