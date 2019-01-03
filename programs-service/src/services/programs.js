let Program = require('@models/program');
let {EntityNotFoundError, EntitySaveError} = require('@serviceErrors/');
const {InvalidIdError} = require('@dataErrors/');
const moment = require('moment');
const jsonPatch = require('jsonpatch');

const print = message => {
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');
    console.log(dateTime + ' ' + message);
};

const list = async () => {
    print('Get list of programs');
    return await Program.list();
};

const get = async (id) => {
    print('Get program with id ' + id);
    let program = await Program.get(id);
    if (!program) {
        throw new EntityNotFoundError("Program with specified id was not found");
    }

    return program;
};

const add = async program => {
    try {
        return Program.add({...program});
    }
    catch (e) {
        throw new EntitySaveError("Failed to save program");
    }
};

const update = async (id, program) => {
    try {
        await Program.update(id, program);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Program with specified id was not found");
        }

        throw new EntitySaveError("Failed to update program");
    }

    return get(id);
};

const updatePatch = async (id, program) => {
    try {
        let dbProgram = await get(id);
        let updatedProgram = jsonPatch.apply_patch(dbProgram, program);
        await Program.update(id, updatedProgram);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Program with specified id was not found");
        }

        throw new EntitySaveError("Failed to update program");
    }

    return get(id);
};


const remove = async id => {
    let result;
    try {
        result = await Program.remove(id);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Program with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove program");
    }

    if (!result) {
        throw new EntityNotFoundError();
    }
};

//---------------------------

const listExercises = async (id) => {
    print('Get exercises for program with id ' + id);
    return Program.listExercises(id);
};

const getExercise = async (id, exerciseId) => {
    print(`Get exercise with id ${exerciseId} for program with id ${id}`);
    let exercise = Program.getExercise(id, exerciseId);
    if (!exercise) {
        throw new EntityNotFoundError("Exercise with specified id was not found");
    }

    return exercise;
};

// TODO: - add validation
const addExercise = async (id, exercise) => {
    try {
        return Program.addExercise(id, exercise);
    }
    catch (e) {
        throw new EntitySaveError("Failed to save exercise");
    }
};

const updateExercise = async (id, exerciseId, exercise) => {
    try {
        await Program.updateExercise(id, exerciseId, exercise);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Exercise with specified id was not found");
        }

        throw new EntitySaveError("Failed to update exercise");
    }

    return getExercise(id, exerciseId);
};

const removeExercise = async (id, exerciseId) => {
    try {
        await Program.removeExercise(id, exerciseId);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Exercise with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove exercise");
    }
};

//---------------------------


const listIterations = async (id, exerciseId) => {
    print('Get list of iterations');
    return await Program.listIterations(id, exerciseId);
};

const getIteration = async (id, exerciseId, iterationId) => {
    print(`Get iteration with id ${exerciseId} for iteration with id ${id}`);
    let iteration = Program.getIteration(id, exerciseId, iterationId);
    if (!iteration) {
        throw new EntityNotFoundError("Iteration with specified id was not found");
    }

    return iteration;
};

// TODO: - add validation
const addIteration = async (id, exerciseId, iteration) => {
    try {
        return Program.addIteration(id, exerciseId, iteration);
    }
    catch (e) {
        throw new EntitySaveError("Failed to save iteration");
    }
};

const updateIteration = async (id, exerciseId, iterationId, iteration) => {
    try {
        await Program.updateIteration(id, exerciseId, iterationId, iteration);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Iteration with specified id was not found");
        }

        throw new EntitySaveError("Failed to update iteration");
    }

    return getIteration(id, exerciseId, iterationId);
};

const removeIteration = async (id, exerciseId, iterationId) => {
    try {
        await Program.removeIteration(id, exerciseId, iterationId);
    }
    catch (e) {
        if(e instanceof InvalidIdError) {
            throw new EntityNotFoundError("Iteration with specified id was not found");
        }

        throw new EntitySaveError("Failed to remove iteration");
    }
};


const ProgramsService = {
    list,
    get,
    add,
    update,
    updatePatch,
    remove,
    listExercises,
    getExercise,
    addExercise,
    updateExercise,
    removeExercise,
    listIterations,
    getIteration,
    addIteration,
    updateIteration,
    removeIteration
};

module.exports = ProgramsService;