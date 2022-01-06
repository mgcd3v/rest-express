const db = require('../utils/database/mysqldb');
const {
    buildSelectQuery,
    buildInsertQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildBatchDeleteQuery,
    buildValues,
} = require('../utils/database/dbshared');

const bcrypt = require('bcryptjs');

const selectAllUsers = async(req, res) => {
    try {
        const query = buildSelectQuery('users', []);
        const values = [];
    
        const results = await db.query(query, values);
    
        res.status(200).send(results);
    } catch (err) {
        throw err;
    }
};

const selectSpecificUser = async(req, res) => {
    try {
        const query = buildSelectQuery('users', [], ['id']);
        const values = buildValues({}, [req.params.id]);

        const results = await db.query(query, values);

        res.status(200).send(results);
    } catch (err) {
        throw err;
    }
};

const insertUser = async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const body = {
            ...req.body,
            password: hashedPassword,
        }
        const query = buildInsertQuery('users', body);
        const values = buildValues(body, []);

        const results = await db.query(query, values);

        res.status(201).json({ message: 'User created' });
    } catch (err) {
        throw err;
    }
};

const updateUser = async(req, res) => {
    try {
        const query = buildUpdateQuery('users', req.body, ['id']);
        const values = buildValues(req.body, [req.params.id]);

        const results = await db.query(query, values);

        res.status(200).json({ message: 'User updated' });
    } catch (err) {
        throw err;
    }
};

const deleteUser = async(req, res) => {
    try {
        const query = buildDeleteQuery('users', ['id']);
        const values = buildValues({}, [req.params.id]);

        const results = await db.query(query, values);

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        throw err;
    }
};

const deleteUsers = async(req, res) => {
    try {
        const query = buildBatchDeleteQuery('users', 'id', req.body);
        const values = buildValues({}, req.body);

        const results = await db.query(query, values);

        res.status(200).json({ message: 'Users deleted' });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    selectAllUsers,
    selectSpecificUser,
    insertUser,
    updateUser,
    deleteUser,
    deleteUsers,
}