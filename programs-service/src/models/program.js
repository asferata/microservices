const {Program: ProgramModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');
//const json = require('@data/programs');
const _ = require('lodash');

async function remove(id) {
    const result = await ProgramModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id) {
    let program = await ProgramModel.findById(id);
    return program.toJSON();
}

async function getExercises(id) {
    let program = await get(id);
    return program ? program.exercises.map(x => x.toJSON()) : [];
}

// TODO: Natalie - this is wrong. Need to change options
async function find(options) {
}

async function list() {
    let programs = await ProgramModel.find();
    programs = programs.map(x => x.toJSON());
    return programs.map(x => _.omit(x, 'exercises'));
}

async function add(program) {
    let createdProgram = await ProgramModel.create(program);
    return get(createdProgram.id);

}

async function update(id, program) {
    await ProgramModel.updateOne({_id: id}, {$set: {...program}});
    return get(id);
}

const Program = {
    remove: Validation.withIdValidation(remove),
    list,
    get: Validation.withIdValidation(get),
    //get,
    getExercises: Validation.withIdValidation(getExercises),
    add,
    update : Validation.withIdValidation(update),
    // find
};

module.exports = Program;