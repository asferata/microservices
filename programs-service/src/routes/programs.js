const express = require('express');
const router = express.Router();
const ProgramsService = require('@services/programs');
const {baseValidator} = require('@validation/');
const schemas = require('@schemas/');

const filterProgramDefault = baseValidator.filterResult(schemas.ProgramDefaultResponseSchema);
const filterProgramFull = baseValidator.filterResult(schemas.ProgramFullResponseSchema);

const filterExerciseDefault = baseValidator.filterResult(schemas.ExerciseDefaultSchema);
const filterExerciseDefaultResponse = baseValidator.filterResult(schemas.ExerciseDefaultResponseSchema);

router.get('/', async function (req, res, next) {
    try {
        const programs = await ProgramsService.list();
        res.json(filterProgramDefault(programs));
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const program = await ProgramsService.get(req.params.id);
        res.status(200).json(filterProgramFull(program));
    }
    catch (e) {
        return next(e);
    }
});

router.post('/', baseValidator.validate(schemas.ProgramDefaultSchema), async function (req, res, next) {
    try {
        let program = await ProgramsService.add(req.body);
        res.status(201).json(baseValidator.filterResult(program, schemas.ProgramDefaultSchema));
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id', baseValidator.validate(schemas.ProgramDefaultSchema), async function (req, res, next) {
    try {
        const program = await ProgramsService.update(req.params.id, req.body);
        res.status(200).json(program);
    }
    catch (e) {
        return next(e);
    }
});

router.patch('/:id', /*programValidator,*/ async function (req, res, next) {
    try {
        const program = await ProgramsService.updatePatch(req.params.id, req.body);
        res.status(200).json(program);
    }
    catch (e) {
        return next(e);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        await ProgramsService.remove(req.params.id);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

//----------------------

router.get('/:id/exercises', async function (req, res, next) {
    try {
        const exercises = await ProgramsService.listExercises(req.params.id);
        res.status(200).json(filterExerciseDefaultResponse(exercises));
    }
    catch (e) {
        return next(e);
    }
});

router.get('/:id/exercises/:exerciseId', async function (req, res, next) {
    try {
        const exercise = await ProgramsService.getExercise(req.params.id, req.params.exerciseId);
        res.status(200).json(filterExerciseDefaultResponse(exercise));
    }
    catch (e) {
        return next(e);
    }
});

router.post('/:id/exercises', async function (req, res, next) {
    try {
        const program = await ProgramsService.addExercise(req.params.id, req.body);
        res.status(200).json(program);
    }
    catch (e) {
        return next(e);
    }
});

router.put('/:id/exercises/:exerciseId', async function (req, res, next) {
    try {
        const exercise = await ProgramsService.updateExercise(req.params.id, req.params.exerciseId, req.body);
        res.status(200).json(exercise);
    }
    catch (e) {
        return next(e);
    }
});

router.delete('/:id/exercises/:exerciseId', async function (req, res, next) {
    try {
        await ProgramsService.removeExercise(req.params.id, req.params.exerciseId);
        res.status(204).send();
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;