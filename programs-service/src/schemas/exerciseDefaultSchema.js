const IterationDefaultSchema = require('./iterationDefaultSchema');

const ExerciseDefaultSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'order'],
    properties: {
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 100
        },
        order: {
            type: 'number'
        },
        comment: {
            type: 'string'
        },
        iterations: {
            type: 'array',
            items: IterationDefaultSchema
        }
    }
};

module.exports = ExerciseDefaultSchema;