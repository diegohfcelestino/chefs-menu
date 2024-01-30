import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '@env';

const generateRandomIV = () => {
  const characters = SECRET_KEY;
  const ivSize = 16;
  let iv = '';
  for (let i = 0; i < ivSize * 2; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    iv += characters[randomIndex];
  }
  return CryptoJS.enc.Hex.parse(iv);
};

export function criptografarDados(data) {
  const keyString = SECRET_KEY;
  const iv = generateRandomIV();

  const cipherText = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(keyString), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const combinedData = CryptoJS.lib.WordArray.create().concat(iv).concat(cipherText.ciphertext);
  const combinedString = CryptoJS.enc.Base64.stringify(combinedData);

  return combinedString;
}

export function descriptografarDados(value) {
  const keyString = SECRET_KEY;

  const combinedData = CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Hex);

  const key = CryptoJS.enc.Utf8.parse(keyString);

  const iv = CryptoJS.enc.Hex.parse(combinedData.substring(0, 32));
  const cipherText = CryptoJS.enc.Hex.parse(combinedData.substring(32));

  const aesDecrypt = CryptoJS.AES.decrypt({
    ciphertext: cipherText,
    salt: '',
  }, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const plainText = aesDecrypt.toString(CryptoJS.enc.Utf8);

  return plainText;
}

