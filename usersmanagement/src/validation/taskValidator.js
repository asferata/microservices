const {TaskSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');

module.exports = baseValidator.validate(TaskSchema);