const {Validation, Sanitation} = require('@utils/');
const {ValidationError} = require('@validationErrors/');
const Ajv = require('ajv');
const setupAsync = require('ajv-async');

const ajv = setupAsync(new Ajv({allErrors: true}));

/*// TODO: Natalie - function that returns function?
const rewriteValidationError = error =>
    error.errors.map(err => {
        return `${err.dataPath.substring(1)} ${err.message}`;
    });*/

const validate = schema => {
    const validateBySchema = ajv.compile(schema);

    return (req, res, next) => {
        req.body = Sanitation.removeExtraProperties(req.body, Object.keys(schema.properties));

        if (!validateBySchema(req.body)) {
            throw new ValidationError(new Ajv.ValidationError(validateBySchema.errors));
        }

        next();
    }
};

module.exports = {
    validate,
};