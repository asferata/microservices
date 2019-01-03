const programDefaultResponseSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        notes: {
            type: 'string'
        }
    }
};

module.exports = programDefaultResponseSchema;