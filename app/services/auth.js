const db = require('../utils/database/mysqldb');
const {
    buildSelectQuery,
    buildValues,
} = require('../utils/database/dbshared');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {
    try {
        const { user_name, password } = req.body;

        const query = buildSelectQuery('users', [], ['user_name']);
        const values = buildValues({}, [user_name]);

        const user = await db.query(query, values);
        if(!user || !user.length){
            res.status(401).json({ message: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user[0].password);
        if (!passwordIsValid) {
            res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
            expiresIn: 86400, 
        });

        res.status(200).json({ message: 'User logged in', authenticated: true, token: token });
    }  catch (err) {
        throw err;
    }
};

const logOut = async(req, res) => {
    try {
        res.status(200).json({ message: 'User logged out', authenticated: false, token: null });
    }  catch (err) {
        throw err;
    }
};

const me = async(req, res) => {
    try {
        let token = req.header('Authorization');
        token = token.replace('Bearer', '').trim();

        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);

        const query = buildSelectQuery('users', [], ['id']);
        const values = buildValues({}, [decodedJWT.id]);

        const user = await db.query(query, values);
        if(!user || !user.length){
            res.status(401).json({ message: 'User not found' });
        }

        res.status(200).json({ me: user[0] });
    }  catch (err) {
        throw err;
    }
};

module.exports = {
    login,
    logOut,
    me,
}