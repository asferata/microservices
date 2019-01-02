const {Program: ProgramModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');
const _ = require('lodash');

async function list() {
    let programs = await ProgramModel.find();
    programs = programs.map(x => x.toJSON());
    // TODO: use schema here
    return programs;//.map(x => _.omit(x, 'exercises'));
}

async function get(id) {
    let program = await ProgramModel.findById(id);
    return program.toJSON();
}

async function add(program) {
    let createdProgram = await ProgramModel.create(program);
    return get(createdProgram.id);

}

async function update(id, program) {
    await ProgramModel.updateOne({_id: id}, {$set: {...program}});
    return get(id);
}

async function remove(id) {
    const result = await ProgramModel.deleteOne({_id: id});
    return result.n !== 0;
}

//----------------------------------------

async function listExercises(id) {
    let program = await ProgramModel.findById(id);
    return program ? program.exercises.map(x => x.toJSON()) : [];
}

async function getExercise(id, exerciseId) {
    let program = await ProgramModel.findById(id);
    if(!program) {
        return null;
    }

    let exercise = program.exercises.id(exerciseId);
    return exercise ? exercise.toJSON() : null;
}

async function addExercise(id, exercise) {
    let program = await ProgramModel.findById(id);
    if(!program) {
        return null;
    }

    program.exercises.push(exercise);
    await program.save();
    let createdExercise = program.exercises[program.exercises.length - 1];
    //return getExercise(id, createdExercise._id);
    return createdExercise.toJSON();
}

async function updateExercise(id, exerciseId, exercise) {
    let program = await ProgramModel.findById(id);
    if(!program) {
        return null;
    }

    let dbExercise = program.exercises.id(exerciseId);
    if(!dbExercise) {
        return null;
    }

    dbExercise.set(exercise);

    await program.save();
    return dbExercise.toJSON();
}

async function removeExercise(id, exerciseId) {
    let program = await ProgramModel.findById(id);
    if(!program) {
        return null;
    }

    let dbExercise = program.exercises.id(exerciseId);
    if(!dbExercise) {
        return null;
    }

    dbExercise.remove();
    await program.save();
}

const Program = {
    list,
    get: Validation.withIdValidation(get),
    add,
    update : Validation.withIdValidation(update),
    remove: Validation.withIdValidation(remove),
    listExercises: Validation.withIdValidation(listExercises),
    getExercise: Validation.withIdValidation(getExercise),
    addExercise: Validation.withIdValidation(addExercise),
    updateExercise: Validation.withIdValidation(updateExercise),
    removeExercise: Validation.withIdValidation(removeExercise)
};

module.exports = Program;