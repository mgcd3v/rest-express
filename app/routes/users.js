const express = require('express');
const router = express.Router();

const {
    selectAllUsers,
    selectSpecificUser,
    insertUser,
    updateUser,
    deleteUser,
    deleteUsers,
} = require('../services/users');

/**
 * @Desc    Fetch all users
 * @Route   GET /api/users
 */
router.get('/', async(req, res) => {
    try {
        await selectAllUsers(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @Desc    Insert user
 * @Route   POST /api/users
 */
router.post('/', async(req, res) => {
    try {
        await insertUser(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @Desc    Batch delete users
 * @Route   DEL /api/users
 */
router.delete('/', async(req, res) => {
    try {
        await deleteUsers(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.route('/:id')
/**
 * @Desc    Fetch specific users
 * @Route   GET /api/users/<id>
 */
.get(async(req, res) => {
    try {
        await selectSpecificUser(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @Desc    Update user
 * @Route   PUT /api/users/<id>
 */
.put(async(req, res) => {
    try {
        await updateUser(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @Desc    Delete user
 * @Route   DEL /api/users/<id>
 */
.delete(async(req, res) => {
    try {
        await deleteUser(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;