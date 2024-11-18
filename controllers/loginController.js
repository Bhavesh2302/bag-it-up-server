require("dotenv").config();
const { Router } = require("express");
const { User } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = Router();

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        res.status(401).send({ msg: "Error occured" });
      }
      if (result === true) {
        const token = jwt.sign(
          { userId: user._id, mobile: user.mobile },
          process.env.secret
        );
        res.status(200).send({
          msg: "Login Successful",
          token: token,
          userInfo: {
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            email: user.email,
            mobile: user.mobile,
          },
        });
      } else {
        res.status(401).send({ msg: "Email and password is incorrect" });
      }
    });
  } else {
    res.status(400).send({ msg: "User Not Found" });
  }
});

module.exports = {
  loginController,
};
