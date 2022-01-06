const mysql = require('mysql2');
const migration = require('mysql-migrations');

const config = require('../config/dbcreds.json');

const {
    host,
    user,
    password,
    database
} = config;

var connection = mysql.createPool({
    host,
    user,
    password,
    database
});

migration.init(connection, __dirname + '/migrations');