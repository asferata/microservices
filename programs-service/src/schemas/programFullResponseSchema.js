const ExerciseDefaultResponseSchema = require('./exerciseDefaultResponseSchema');

const programFullResponseSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string',
        },
        notes: {
            type: 'string'
        },
        exercises: {
            type: 'array',
            items: ExerciseDefaultResponseSchema
        }
    }
};

module.exports = programFullResponseSchema;