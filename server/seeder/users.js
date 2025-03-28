const Crypto = require("crypto");

const encrypt = (password) => {
  const salt = Crypto.randomBytes(16).toString("hex");
  const hash = Crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(
    `hex`
  );
  return { salt, hash };
};

const users = [
  { full_name: "Albert Lukas", username: "albert123", password: "password123" },
  { full_name: "John Doe", username: "johndoe", password: "securepass" },
  { full_name: "Jane Smith", username: "janesmith", password: "mypassword" },
];

console.log(
  "INSERT INTO users (full_name, username, salt, password, created_at, updated_at) VALUES"
);

users.forEach((user) => {
  const { salt, hash } = encrypt(user.password);
  console.log(
    `('${user.full_name}', '${user.username}', '${salt}', '${hash}', NOW(), NOW()),`
  );
});
