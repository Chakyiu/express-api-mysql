const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { salt, secret } = require("../config/key");

const { createClinic, getClinicByEmail } = require("./clinic.service");
const jwt = require("jsonwebtoken");

//Routers
router.post("/", createAccount);
router.post("/login", login);

module.exports = router;

function createAccount(req, res) {
  const body = req.body;
  body.password = encryptWithSalt(body.password, salt);

  var msg = [];

  getClinicByEmail(body.email, (err, result) => {
    if (err) {
      res.status(404).json({
        message: "Database connection failed",
      });
      return;
    }

    if (result) msg.push("Account already exists.");
  });

  createClinic(body, (err, result) => {
    if (err) {
      res.status(404).json({
        message: "Creation failed. " + msg.join(" "),
      });
      return;
    }

    res.status(200).json({
      message: "Clinic account created",
    });
  });
}

function login(req, res) {
  const body = req.body;
  var msg = [];

  getClinicByEmail(body.email, (err, result) => {
    if (err) {
      res.status(404).json({
        message: "Database connection failed",
      });
      return;
    }

    if (!result) {
      res.json({ message: "Account does not exist" });
    }

    if (comparePassword(body.password, result[0].password)) {
      result.password = undefined;
      const jwtoken = jwt.sign({ result: result }, secret, {
        expiresIn: "1h",
      });
      return res.json({ message: "login success", token: jwtoken });
    } else {
      return res.json({ message: "Wrong password" });
    }
  });
}

function encryptWithSalt(password, salt) {
  const md5 = crypto.createHash("md5");
  let saltPw = password + ":" + salt;
  return md5.update(saltPw).digest("hex");
}

function comparePassword(password, result_password) {
  if (encryptWithSalt(password, salt) === result_password) return true;
  return false;
}
