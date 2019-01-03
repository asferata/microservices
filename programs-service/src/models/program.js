const {Program: ProgramModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');

async function list() {
    let programs = await ProgramModel.find();
    return programs ? programs.map(x => x.toJSON()) : null;
}

async function get(id) {
    let program = await ProgramModel.findById(id);
    return program ? program.toJSON() : null;
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

    // remove deleted iterations
    let iterationsIds = exercise.iterations.map( x => x.id);
    let dbIterationsIds = dbExercise.iterations.map( x => x.id);
    dbExercise.iterations.forEach(x => {
        if(!iterationsIds.includes(x.id)) {
            dbExercise.iterations.id(x.id).remove();
        }
        else {
            dbExercise.iterations.id(x.id).set(exercise.iterations.find(i => i.id === x.id));
        }
    });

    exercise.iterations.filter(x => !dbIterationsIds.includes(x.id)).forEach(x => dbExercise.iterations.add(x));
    delete(exercise.iterations);
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