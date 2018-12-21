const {ProjectSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');

module.exports = baseValidator.validate(ProjectSchema);