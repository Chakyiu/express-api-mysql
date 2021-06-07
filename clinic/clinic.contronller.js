const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { salt, secret } = require("../config/key");
const authorize = require("../middleware/authorize");

const {
  createClinic,
  getClinicByEmail,
  createRecord,
  getRecordOnDate,
} = require("./clinic.service");
const jwt = require("jsonwebtoken");

//Routers
router.post("/createClinic", createAccount);
router.post("/login", login);
router.post("/create", authorize, create);
router.get("/getRecord", authorize, getRecord);

module.exports = router;

function createAccount(req, res) {
  const body = req.body;
  body.password = encryptWithSalt(body.password, salt);

  var msg = [];

  getClinicByEmail(body.email, (err, result) => {
    if (err) {
      res.status(404).json({
        message: err,
      });
      return;
    }

    if (result.length > 0) {
      msg.push("Account already exists.");
      res.status(404).json({
        message: "Creation failed. " + msg.join(" "),
      });
      return;
    } else {
      createClinic(body, (err, result) => {
        if (err) {
          msg.push(err);
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
  });
}

function login(req, res) {
  const body = req.body;
  var msg = [];

  getClinicByEmail(body.email, (err, result) => {
    if (err) {
      res.status(404).json({
        message: err,
      });
      return;
    }

    if (result.length === 0) {
      res.json({ message: "Account does not exist" });
      return;
    } else {
      if (comparePassword(body.password, result[0].password)) {
        result.password = undefined;
        const jwtoken = jwt.sign({ result: result }, secret, {
          expiresIn: "7d",
        });
        return res.json({ message: "login success", token: jwtoken });
      } else {
        return res.json({ message: "Wrong password" });
      }
    }
  });
}

function create(req, res) {
  const body = req.body;
  var msg = [];

  getClinicByEmail(body.email, (err, result) => {
    if (err) {
      res.status(404).json({
        message: err,
      });
      return;
    }

    if (result.length > 0) msg.push("Account already exists.");
  });

  createRecord(body, (err, result) => {
    if (err) {
      msg.push(err);
      res.status(404).json({
        message: "Creation failed. " + msg.join(" "),
      });
      return;
    }

    res.status(200).json({
      message: "Record created",
    });
  });
}

function getRecord(req, res) {
  const body = req.query;
  var msg = [];

  getRecordOnDate(body, (err, result) => {
    if (err) {
      msg.push(err);
      res.status(404).json({
        message: "Request failed. " + msg.join(" "),
      });
      return;
    }

    res.status(200).json({
      record: result,
    });
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
