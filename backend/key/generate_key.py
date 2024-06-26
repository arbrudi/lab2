from cryptography.fernet import Fernet

# Generate a key
key = Fernet.generate_key()

# Print the key (copy this and store it securely)
print(key.decode())
