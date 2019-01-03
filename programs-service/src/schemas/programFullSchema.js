const ExerciseDefaultSchema = require('./exerciseDefaultSchema');

const ProgramFullSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['title'],
    properties: {
        title: {
            type: 'string',
            minLength: 2,
            maxLength: 100
        },
        notes: {
            type: 'string'
        },
        exercises: {
            type: 'array',
            items: ExerciseDefaultSchema
        }
    }
};

module.exports = ProgramFullSchema;