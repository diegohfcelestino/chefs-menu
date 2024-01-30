import crypto from "crypto";

const secretKey = process.env.SECRET_KEY;
const ivSize = 16;

export const encryptString = (data) => {
  const iv = crypto.randomBytes(ivSize);
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let cipherText = cipher.update(Buffer.from(data, "utf8"));
  cipherText = Buffer.concat([cipherText, cipher.final()]);
  const combinedData = Buffer.concat([iv, cipherText]);
  const combineString = combinedData.toString("base64");

  return combineString;
};


export const decryptString = (data) => {
  const combinedData = Buffer.from(data, "base64");
  const iv = Buffer.alloc(ivSize);
  const cipherText = Buffer.alloc(combinedData.length - iv.length);
  combinedData.copy(iv, 0, 0, iv.length);
  combinedData.copy(cipherText, 0, iv.length);
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let plainText = decipher.update(cipherText, "utf8");
  plainText += decipher.final("utf8");
  return plainText;
};