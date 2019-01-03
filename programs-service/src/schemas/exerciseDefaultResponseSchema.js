const IterationDefaultResponseSchema = require('./iterationDefaultResponseSchema');

const ExerciseDefaultResponseSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        order: {
            type: 'number'
        },
        comment: {
            type: 'string'
        },
        iterations: {
            type: 'array',
            items: IterationDefaultResponseSchema
        }
    }
};

module.exports = ExerciseDefaultResponseSchema;