const { Router } = require("express");
const { User } = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const signupController = Router();

signupController.post("/", async (req, res) => {
  const { firstname, lastname, email, password, role, mobile } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    res.status(201).send({ msg: "User Already Present" });
  } else {
    try {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          res
            .status(400)
            .send({ msg: "Something went wrong please try again!" });
        }
        if (hash) {
          const userDetails = new User({
            firstname,
            lastname,
            email,
            password: hash,
            role,
            mobile,
          });
          await userDetails.save()
          res.status(200).send({msg :"Signup Successfull"})
        }
      });
    } catch (err) {
     res.status(400).send({msg: "Bad Request Please Try Again!"})
    }
  }
});


module.exports ={
    signupController
}