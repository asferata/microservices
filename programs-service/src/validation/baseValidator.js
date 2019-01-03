const {ValidationError} = require('@validationErrors/');
const Ajv = require('ajv');
const setupAsync = require('ajv-async');

const ajv = setupAsync(new Ajv({allErrors: true, removeAdditional: true}));

const validate = schema => {
    const validateBySchema = ajv.compile(schema);

    return (req, res, next) => {
        if (!validateBySchema(req.body)) {
            next(new ValidationError(new Ajv.ValidationError(validateBySchema.errors)));
        }

        next();
    }
};

const filterResult = schema => {
    const validateBySchema = ajv.compile(schema);

    return (result) => {
        if (result instanceof Array) {
            result.map(validateBySchema);
        } else {
            validateBySchema(result);
        }

        return result;
    }
};


module.exports = {
    validate,
    filterResult
};