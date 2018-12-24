const express = require('express');
const router = express.Router();
const UsersService = require('@services/users');
const {userValidator} = require('@validation/');

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


router.delete('/:id', async function (req, res, next) {
    try {
        await UsersService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', userValidator, async function (req, res, next) {
    try {
        let user = await UsersService.add(req.body);
        res.status(201).json(user);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', userValidator, async function (req, res, next) {
    try {
        const user = await UsersService.update(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;