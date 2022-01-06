const express = require('express');
const router = express.Router();

const {
    login,
    logOut,
    me,
} = require('../services/auth');

/**
 * @Desc    Authenticate user
 * @Route   POST /api/auth/login
 */
router.post('/login', async(req, res) => {
    try {
        await login(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @Desc    Unauthenticate user
 * @Route   POST /api/auth/logout
 */
router.post('/logout', async(req, res) => {
    try {
        await logOut(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @Desc    Get details for looged in user
 * @Route   GET /api/auth/me
 */
 router.get('/me', async(req, res) => {
    try {
        await me(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;