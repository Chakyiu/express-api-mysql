const connection = require("../config/db");

module.exports = {
  createClinic,
  getClinicByEmail,
};

function createClinic(data, callback) {
  connection.query(
    `INSERT INTO CLINIC(email, password, phone_number, address) values (?, ?, ?, ?)`,
    [data.email, data.password, data.phone_number, data.address],
    (err, result, fields) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    }
  );
}

function getClinicByEmail(email, callback) {
  connection.query(
    `SELECT * FROM CLINIC WHERE email = ?`,
    [email],
    (err, result, fields) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    }
  );
}
