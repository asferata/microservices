const express = require('express');
const router = express.Router();
const UsersService = require('@services/users');

router.get('/', async function (req, res, next) {
    try {
        const users = await UsersService.list();
        res.json(users);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const user = await UsersService.get(req.params.id);
        res.status(200).json(user);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;