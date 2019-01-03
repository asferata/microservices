const ProgramsService = require('@services/programs');
const {baseValidator} = require('@validation/');
const schemas = require('@schemas/');

const filterProgramDefault = baseValidator.filterResult(schemas.ProgramDefaultResponseSchema);
const filterProgramFull = baseValidator.filterResult(schemas.ProgramFullResponseSchema);

const filterExerciseDefault = baseValidator.filterResult(schemas.ExerciseDefaultSchema);
const filterExerciseDefaultResponse = baseValidator.filterResult(schemas.ExerciseDefaultResponseSchema);

module.exports = function(baseRoute, server) {
    server.get(`${baseRoute}/`, async function (req, res, next) {
        try {
            const programs = await ProgramsService.list();
            res.json(200, filterProgramDefault(programs));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.get(`${baseRoute}/:id`, async function (req, res, next) {
        try {
            const program = await ProgramsService.get(req.params.id);
            res.json(200, filterProgramFull(program));
            return next();
        } catch (e) {
            return next(e);
        }
    });

// TODO: temporarily commented out in order to create full program
    server.post(`${baseRoute}/`, baseValidator.validate(schemas.ProgramDefaultSchema), async function (req, res, next) {
        try {
            let program = await ProgramsService.add(req.body);
            res.json(201, filterProgramDefault(program));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.put(`${baseRoute}/:id`, baseValidator.validate(schemas.ProgramDefaultSchema), async function (req, res, next) {
        try {
            const program = await ProgramsService.update(req.params.id, req.body);
            res.json(200, filterProgramDefault(program));
            return next();
        } catch (e) {
            return next(e);
        }
    });

// router.patch('/:id', /*programValidator,*/ async function (req, res, next) {
//     try {
//         const program = await ProgramsService.updatePatch(req.params.id, req.body);
//         res.status(200).json(program);
//     }
//     catch (e) {
//         return next(e);
//     }
// });

    server.del(`${baseRoute}/:id`, async function (req, res, next) {
        try {
            await ProgramsService.remove(req.params.id);
            res.status(204);
            return next();
        } catch (e) {
            return next(e);
        }
    });

//----------------------
// TODO: split to different routers?

    server.get(`${baseRoute}/:id/exercises`, async function (req, res, next) {
        try {
            const exercises = await ProgramsService.listExercises(req.params.id);
            res.json(200, filterExerciseDefaultResponse(exercises));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.get(`${baseRoute}/:id/exercises/:exerciseId`, async function (req, res, next) {
        try {
            const exercise = await ProgramsService.getExercise(req.params.id, req.params.exerciseId);
            res.json(200, filterExerciseDefaultResponse(exercise));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.post(`${baseRoute}/:id/exercises`, async function (req, res, next) {
        try {
            const exercise = await ProgramsService.addExercise(req.params.id, req.body);
            res.json(201, filterExerciseDefaultResponse(exercise));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.put(`${baseRoute}/:id/exercises`, async function (req, res, next) {
        try {
            // TODO: re-order exercises
            // const program = await ProgramsService.addExercise(req.params.id, req.body);
            // res.status(200).json(program);
            res.status(204);
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.put(`${baseRoute}/:id/exercises/:exerciseId`, async function (req, res, next) {
        try {
            const exercise = await ProgramsService.updateExercise(req.params.id, req.params.exerciseId, req.body);
            res.json(200, filterExerciseDefaultResponse(exercise));
            return next();
        } catch (e) {
            return next(e);
        }
    });

    server.del(`${baseRoute}/:id/exercises/:exerciseId`, async function (req, res, next) {
        try {
            await ProgramsService.removeExercise(req.params.id, req.params.exerciseId);
            res.status(204);
            return next();
        } catch (e) {
            return next(e);
        }
    });
};

//----------------------
// TODO: split to different routers?

// module.exports = router;