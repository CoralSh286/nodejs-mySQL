/** @format */

const bcrypt = require("bcrypt");

const comparePassword = (plainPassword, hashedPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        resolve(true);
      } else {
        reject(new Error("Invalid password"));
      }
    });
  });

const hashPassword = (plainPassword, saltRounds = 10) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });


module.exports = { comparePassword, hashPassword };
