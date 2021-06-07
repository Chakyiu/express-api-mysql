const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "mysqldb",
  port: "3306",
  user: "root",
  password: "root",
  database: "testdb",
});

module.exports = connection;
