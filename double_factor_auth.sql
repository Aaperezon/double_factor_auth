DROP DATABASE IF EXISTS double_factor_auth;
CREATE DATABASE double_factor_auth;

USE double_factor_auth;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user VARCHAR(50),
	password TEXT,
	first_doubleFA TEXT,
	second_doubleFA TEXT,
	third_doubleFA TEXT
);




