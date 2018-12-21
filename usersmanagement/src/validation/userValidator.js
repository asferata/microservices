const {UserSchema} = require('@schemas/');
const baseValidator = require('./baseValidator');

module.exports = baseValidator.validate(UserSchema);