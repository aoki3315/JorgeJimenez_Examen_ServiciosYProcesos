import CryptoJS from "crypto-js";

const SECRET_KEY = "EvolutionMobilityExamenSecret"; // En un entorno real, esto vendría de una variable de entorno

/**
 * Encripta un texto usando AES (Criptografía de ida)
 */
export const encryptData = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

/**
 * Desencripta un texto usando AES (Criptografía de vuelta)
 */
export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
