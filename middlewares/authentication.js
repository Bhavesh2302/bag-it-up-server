require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {

  if (!req.headers.authorization) {
    res.status(401).send({ msg: "Please Try Again!" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err) {
      res.send(401).send({ msg: "Something went wrong try again" });
    } else {
      req.body.userId = decoded.userId;
      next()
    }
  });
};

module.exports = {
  authentication,
};
