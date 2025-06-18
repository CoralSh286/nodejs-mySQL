
const express = require("express"),
  router = express.Router(),
  service = require("../BL/users.service");
router.get("/checkIfUserExist", async (req, res) => {
  try {
    const { username } = req.query;
    const user = await service.getUser(username);
    if (user) {
      return res.send({
        success: true,
        userFound: true,
        message: "User was found",
      });
    }
    else{
      res.send({
        success: true,
        userFound: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).send(error.message || "Error fetching user");
  }
});
router.post("/register", async (req, res) => {
  try {
    const data = await service.createUser(req.body);
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      street: data.street,
      city: data.city,
      company_name: data.company_name,
    };
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message || "Error creating user");
  }
});
router.put("/login", async (req, res) => {
  try {
    const data = await service.login(req.body);
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      street: data.street,
      city: data.city,
      company_name: data.company_name,
    };
    if (data) {
      res.send({
        success: true,
        message: "Login successful",
        isLogin: true,
        user: user,
      });
    }
  } catch (error) {
    res.status(401).send( {
        success: false,
        message: 'Invalid username or password',
        isLogin: false,
      })
  }
  
});

module.exports = router;
