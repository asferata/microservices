const express = require('express');
const router = express.Router();
const ProgramsService = require('@services/programs');
const {programValidator} = require('@validation/');

router.get('/', async function (req, res, next) {
    try {
        const programs = await ProgramsService.list();
        res.json(programs);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const program = await ProgramsService.get(req.params.id);
        res.status(200).json(program);
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id/exercises', async function (req, res, next) {
    try {
        const exercises = await ProgramsService.getExercises(req.params.id);
        res.status(200).json(exercises);
    }
    catch (e) {
        return next(e);
    }
});

/*

router.delete('/:id', async function (req, res, next) {
    try {
        await ProgramsService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', programValidator, async function (req, res, next) {
    try {
        let program = await ProgramsService.add(req.body);
        res.status(201).json(program);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', programValidator, async function (req, res, next) {
    try {
        const program = await ProgramsService.update(req.params.id, req.body);
        res.status(200).json(program);
    }
    catch (e) {
        return next(e);
    }
});*/

module.exports = router;