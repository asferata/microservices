const {ProgramSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');

module.exports = baseValidator.validate(ProgramSchema);