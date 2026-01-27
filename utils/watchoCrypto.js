// const crypto = require("crypto");

// // const md5Key = (secret) => crypto.createHash("md5").update(secret).digest();

// // Expand 16 → 24 bytes (EDE3)
// // const expandKey24 = (key16) =>
// //   Buffer.concat([key16, key16.slice(0, 8)]);

// // exports.encrypt = (payload, secret) => {
// //   const json = JSON.stringify(payload);

// //   const key16 = md5Key(secret);
// //   const key24 = expandKey24(key16);

// //   const cipher = crypto.createCipheriv("des-ede3", key24, null);
// //   cipher.setAutoPadding(true);

// //   let encrypted = cipher.update(json, "utf8", "base64");
// //   encrypted += cipher.final("base64");

// //   return encrypted;
// // };

// function md5Raw(secret) {
//   return crypto.createHash("md5").update(secret).digest(); // 16 bytes
// }

// exports.encrypt = (payload, secret) => {
//   const json = JSON.stringify(payload);
//   const key16 = md5Raw(secret);

//   const cipher = crypto.createCipheriv(
//     "des-ede-ecb",   // ✅ MUST be this
//     key16,
//     null
//   );

//   cipher.setAutoPadding(true);

//   let encrypted = cipher.update(json, "utf8", "base64");
//   encrypted += cipher.final("base64");

//   return encrypted;
// };
// exports.decrypt = (encryptedBase64, secret) => {
//   const key16 = md5Key(secret);
//   const key24 = expandKey24(key16);

//   const decipher = crypto.createDecipheriv("des-ede3", key24, null);
//   decipher.setAutoPadding(true);

//   let decrypted = decipher.update(encryptedBase64, "base64", "utf8");
//   decrypted += decipher.final("utf8");

//   return JSON.parse(decrypted);
// };
const crypto = require("crypto");

exports.watchoEncrypt = (text, secret) => {
  const key = crypto.createHash("sha256")
    .update(secret)
    .digest()
    .slice(0, 24); // AES-192 key

  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv("aes-192-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encodeURIComponent(encrypted);
};

exports.watchoDecrypt = (encryptedText, secret) => {
  const key = crypto
    .createHash("sha256")
    .update(secret)
    .digest()
    .slice(0, 24); // AES-192 key

  const iv = Buffer.alloc(16, 0); // same IV as encryption

  // reverse URL encoding
  const decoded = decodeURIComponent(encryptedText);

  const decipher = crypto.createDecipheriv("aes-192-cbc", key, iv);
  let decrypted = decipher.update(decoded, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

// const plainText = "160|bH@reer!$#2345|10950334";
// const encryptedValue = encrypt(plainText);
// console.log(encryptedValue);

function md5Key(secret) {
  return crypto.createHash("md5").update(secret).digest();
}

function expandKey24(key16) {
  return Buffer.concat([key16, key16.slice(0, 8)]);
}

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

exports.decrypt = (encrypted, secret) => {
  const key16 = md5Key(secret);
  const key24 = expandKey24(key16);

  const decipher = crypto.createDecipheriv("des-ede3", key24, null);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};
