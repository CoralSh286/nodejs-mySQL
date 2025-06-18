/** @format */

const controller = require("../DL/controllers/users.controller");
const { hashPassword, comparePassword } = require("../utils/password.utils");

const createUser = async (data = {}) => {
  if (!data.username || !data.password) {
    throw new Error("Username and password are required");
  }
  if (data.password.length < 1) {
    throw new Error("Password must be at least 1 character long");
  }
  if (data.username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }
  if (data.email && !data.email.includes("@")) {
    throw new Error("Email must be a valid email address");
  }
  if (data.full_name && data.full_name.length < 1) {
    throw new Error("Full name must be at least 1 character long");
  }
  if (data.phone && data.phone.length < 1) {
    throw new Error("Phone number must be at least 1 character long");
  }
  if (data.street && data.street.length < 1) {
    throw new Error("Street must be at least 1 character long");
  }
  if (data.city && data.city.length < 1) {
    throw new Error("City must be at least 1 character long");
  }
  if (data.company_name && data.company_name.length < 1) {
    throw new Error("Company name must be at least 1 character long");
  }

  data.password = await hashPassword(data.password);
  return await controller.create(data);
};
const getUser = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }
  return await controller.readOneUser( username );
};
const login = async (loginUser = {}) => {
  
    if (!loginUser.username || !loginUser.password) {
      throw new Error("Username and password are required");
    }
    const user = await controller.readOneUser(loginUser.username );
    if (!user) {
      throw new Error("User not found");
    }
    const loginPassword = loginUser.password;
    
    const dbPassword = await controller.readPassword({ userId: user.id });
    if (!dbPassword) {
      console.log("Username or password is missing");
      throw new Error("Password not found for user");
    }
    
    const isPasswordValid = await comparePassword(loginPassword, dbPassword);
    if (!isPasswordValid) {
      console.log("isPasswordValid");
      throw new Error("Invalid password");
    }
    return user;
 
};

module.exports = { createUser, getUser, login };
