const mysql = require('mysql2');

const config = require('../../../config/dbcreds.json');

const {
    host,
    user,
    password,
    database
} = config;

connection = mysql.createConnection({
    host,
    user,
    password,
    database
});

const db = {
    query: (query, values) => {
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, results) => {
                if(err){
                    return reject(err);
                }

                return resolve(results);
            })
        });
    }
};

module.exports = db;