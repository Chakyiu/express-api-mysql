CREATE DATABASE IF NOT EXISTS testdb;
use testdb;

DROP TABLE IF EXISTS clinic;
DROP TABLE IF EXISTS records;

CREATE TABLE IF NOT EXISTS clinic (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	clinic VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    diagnosis VARCHAR(255) NOT NULL,
    medication VARCHAR(255) NOT NULL,
    consultation_fee INT NOT NULL,
    date DATETIME NOT NULL,
    follow_up BOOLEAN NOT NULL
);

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
-- FLUSH PRIVILEGES;