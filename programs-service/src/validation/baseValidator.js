const {Validation, Sanitation} = require('@utils/');
const {ValidationError} = require('@validationErrors/');
const Ajv = require('ajv');
const setupAsync = require('ajv-async');

const ajv = setupAsync(new Ajv({allErrors: true, removeAdditional: true}));

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

const filterResult = schema => {
    const validateBySchema = ajv.compile(schema);

    return (result) => {
        // result = Sanitation.removeExtraProperties(result, Object.keys(schema.properties));
        // validateBySchema(result);
        if (result instanceof Array) {
            result.map(validateBySchema);
        } else {
            validateBySchema(result);
        }

        return result;
    }
};

// const filterResult = (result, schema) => {
//     if(result instanceof Array) {
//         return result.map(x => Sanitation.removeExtraProperties(x, Object.keys(schema.properties)));
//     }
//     else {
//         return Sanitation.removeExtraProperties(result, Object.keys(schema.properties));
//     }
//
//     // TODO: do we need this?
//     // if (!validateBySchema(result)) {
//     //     throw new ValidationError(new Ajv.ValidationError(validateBySchema.errors));
//     // }
//
//     // return result;
// };

module.exports = {
    validate,
    filterResult
};