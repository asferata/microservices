const ProgramDefaultSchema = {
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
        }
    }
};

module.exports = ProgramDefaultSchema;