from flask import Flask, request, jsonify
from flask_cors import CORS
from vigenere import encrypt_vigenere, decrypt_vigenere

app = Flask(__name__)
CORS(app)

@app.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.get_json()
    text = data["text"]
    key = data["key"]
    result = encrypt_vigenere(text, key)
    return jsonify({"result": result})

@app.route("/decrypt", methods=["POST"])
def decrypt():
    data = request.get_json()
    text = data["text"]
    key = data["key"]
    result = decrypt_vigenere(text, key)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
