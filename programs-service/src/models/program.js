const {Program: ProgramModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');
const json = require('@data/programs');
const _ = require('lodash');

async function remove(id) {
    const result = await ProgramModel.deleteOne({_id: id});
    return result.n !== 0;
}

async function get(id) {
    let program = json.find(x => x.id === id);
    return program;
}

async function getExercises(id) {
    let exercises = json.filter(x => x.id === id).map(x => x.exercises);
    return exercises;
}

// TODO: Natalie - this is wrong. Need to change options
async function find(options) {
}

async function list() {
    const results = json.map(x => _.omit(x, 'exercises'));
    return results;
}

async function add(program) {
}

async function update(id, program) {
}

const Program = {
    // remove: Validation.withIdValidation(remove),
    list,
    get: Validation.withIdValidation(get),
    getExercises
    // add,
    // update : Validation.withIdValidation(update),
    // find
};

module.exports = Program;