/** @format */

const pool = require("../db");

// CRUD
async function create({
  username,
  password,
  email,
  full_name,
  company_name,
  city,
  street,
  phone,
}) {
  try {
    const query =
      "INSERT INTO users (username, email, full_name, company_name, city , street, phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(query, [
      username,
      email,
      full_name,
      company_name,
      city,
      street,
      phone,
    ]);

    // Insert password into users_passwords table
    const userId = result.insertId;
    const passwordQuery =
      "INSERT INTO users_passwords (user_id, password_hash) VALUES (?, ?)";
    await pool.execute(passwordQuery, [userId, password]);

    return {
      id: userId,
      username,
      password,
      email,
      full_name,
      company_name,
      city,
      street,
      phone,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
async function readOneUser(username) {
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [result] = await pool.execute(query, [username]);
    return result[0] || null; // Return the first user or null if not found
  } catch (error) {
    throw new Error("Failed to read user");
  }
}

async function readPassword({ userId }) {
  try {
    const query =
      "SELECT password_hash FROM users_passwords WHERE user_id = ? LIMIT 1";
    const [result] = await pool.execute(query, [userId]);
    if (result.length === 0) {
      throw new Error("User not found");
    }
    return result[0].password_hash || null; // Return the password hash or null if not found
  } catch (error) {
    throw new Error("Failed to read user password");
  }
}

module.exports = { create, readOneUser, readPassword };
