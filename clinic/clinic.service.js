const connection = require("../config/db");

module.exports = {
  createClinic,
  getClinicByEmail,
  createRecord,
  getRecordOnDate,
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

function createRecord(data, callback) {
  connection.query(
    `INSERT INTO RECORDS(clinic, doctor_name, patient_name, diagnosis, medication, consultation_fee, date, follow_up) values (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.clinic,
      data.doctor_name,
      data.patient_name,
      data.diagnosis,
      data.medication,
      data.consultation_fee,
      data.date,
      data.follow_up,
    ],
    (err, result, fields) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    }
  );
}

function getRecordOnDate(data, callback) {
  var sql_query = "SELECT * FROM RECORDS ";
  if (data.from || data.to) sql_query += "WHERE ";
  if (data.from) sql_query += `date >= "${data.from}" `;
  if (data.from && data.to) sql_query += "AND ";
  if (data.to) sql_query += `date <= "${data.to}" `;
  if (data.limit) sql_query += `LIMIT ${data.limit} `;
  if (data.offset) sql_query += `OFFSET ${data.offset} `;

  connection.query(sql_query, (err, result, fields) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  });
}
