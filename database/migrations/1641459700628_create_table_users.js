module.exports = {
    "up": "CREATE TABLE `users` (id int(11) NOT NULL AUTO_INCREMENT, first_name varchar(50) DEFAULT NULL, last_name varchar(50) DEFAULT NULL, address varchar(100) DEFAULT NULL, post_code varchar(10) DEFAULT NULL, phone_no varchar(20) DEFAULT NULL, email varchar(100) DEFAULT NULL, user_name varchar(50) DEFAULT NULL, password varchar(1000) DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;",
    "down": "DROP TABLE users"
}