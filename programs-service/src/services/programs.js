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

const getExercises = async (id) => {
    print('Get exercises for program with id ' + id);
    return Program.getExercises(id);
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
        result = await Program.remove({_id: id});
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

const ProgramsService = {
    list,
    get,
    getExercises,
    add,
    update,
    updatePatch,
    remove
};

module.exports = ProgramsService;