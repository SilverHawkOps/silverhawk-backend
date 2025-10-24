// encrypt-decrypt-shkey.js
import crypto from "crypto";

const ALGO = "aes-256-gcm"; // AEAD algorithm
const IV_LEN = 12; // recommended for GCM
const TAG_LEN = 16; // auth tag length
const SHKEY_PREFIX = "shkey:v1"; // prefix for shkey tokens
const SHKEY_SECRET = process.env.SHKEY_SECRET || "replace-with-strong-secret";

function deriveKey(secret) {
  return crypto.createHash("sha256").update(secret, "utf8").digest(); // 32 bytes
}

export const encryptShKey = (plainText) => {
  if (!SHKEY_SECRET) throw new Error("Secret required for encryption");
  const key = deriveKey(SHKEY_SECRET);
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv, {
    authTagLength: TAG_LEN,
  });
  const ciphertext = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  const packed = Buffer.concat([iv, tag, ciphertext]).toString("base64");

  return `${SHKEY_PREFIX}:${packed}`;
};

// Decrypt token produced by encryptShKey
export const decryptShKey = (token) => {
  try {
    if (!SHKEY_SECRET) throw new Error("Secret required for decryption");
    if (!token || !token.startsWith(`${SHKEY_PREFIX}:`))
      throw new Error("Invalid token format");
    const packedB64 = token.split(":")[2];
    if (!packedB64) throw new Error("Invalid token payload");

    const packed = Buffer.from(packedB64, "base64");

    const iv = packed.slice(0, IV_LEN);
    const tag = packed.slice(IV_LEN, IV_LEN + TAG_LEN);
    const ciphertext = packed.slice(IV_LEN + TAG_LEN);

    const key = deriveKey(SHKEY_SECRET);
    const decipher = crypto.createDecipheriv(ALGO, key, iv, {
      authTagLength: TAG_LEN,
    });
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  } catch (error) {
    console.log("Error decrypting token:", error.message);
    return null;
  }
};
