def encrypt_vigenere(plaintext, key):
    ciphertext = ""
    key = key.upper()
    key_index = 0

    for char in plaintext:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord('A')
            base = ord('A') if char.isupper() else ord('a')
            cipher_char = chr((ord(char) - base + shift) % 26 + base)
            ciphertext += cipher_char
            key_index += 1
        else:
            ciphertext += char
    return ciphertext

def decrypt_vigenere(ciphertext, key):
    plaintext = ""
    key = key.upper()
    key_index = 0

    for char in ciphertext:
        if char.isalpha():
            shift = ord(key[key_index % len(key)]) - ord('A')
            base = ord('A') if char.isupper() else ord('a')
            plain_char = chr((ord(char) - base - shift + 26) % 26 + base)
            plaintext += plain_char
            key_index += 1
        else:
            plaintext += char
    return plaintext
