const mysql = require('mysql')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'antutu09',
    database: 'mylinks_table',
    charset : 'utf8mb4'
})

module.exports = connection

/* 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'antutu09'
create database mylinks_table;
use mylinks_table;
drop table users;
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(255) NOT NULL ,
    name VARCHAR(255) CHARACTER SET utf8mb4, 
    password VARCHAR(255),
    email VARCHAR(255),
    avatar MEDIUMTEXT,
    cover MEDIUMTEXT,
    verified BOOLEAN DEFAULT 0,
    birthday TINYTEXT,
    bio VARCHAR(255) CHARACTER SET utf8mb4,  
    links json DEFAULT NULL,
    UNIQUE KEY username (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) engine=myisam DEFAULT CHARSET=utf8; SET NAMES 'utf8mb4';
*/

//show columns from users
//mysqldump -h 127.0.0.1 -u db_user -psecretpassword db_name > import_file.sql 
//set @i := 0;update users set id = (@i := @i+1 ) order by id;

//ALTER TABLE users AUTO_INCREMENT = 25

//где 25 - это следующий номер после реально занятого
//т.е. если SELECT MAX(id) FROM users вернул 24, вы укажете 25.