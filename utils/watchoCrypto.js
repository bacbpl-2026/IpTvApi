const crypto = require("crypto");

const md5Key = (secret) => crypto.createHash("md5").update(secret).digest();

// Expand 16 → 24 bytes (EDE3)
const expandKey24 = (key16) =>
  Buffer.concat([key16, key16.slice(0, 8)]);

exports.encrypt = (payload, secret) => {
  const json = JSON.stringify(payload);

  const key16 = md5Key(secret);
  const key24 = expandKey24(key16);

  const cipher = crypto.createCipheriv("des-ede3", key24, null);
  cipher.setAutoPadding(true);

  let encrypted = cipher.update(json, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
};

exports.decrypt = (encryptedBase64, secret) => {
  const key16 = md5Key(secret);
  const key24 = expandKey24(key16);

  const decipher = crypto.createDecipheriv("des-ede3", key24, null);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encryptedBase64, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};
