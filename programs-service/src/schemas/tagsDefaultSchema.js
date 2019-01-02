const TagsDefaultSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        count: {
            type: 'string'
        },
        time: {
            type: 'string'
        },
        distance: {
            type: 'string'
        },
        flection: {
            type: 'string'
        },
        speed: {
            type: 'string'
        },
        weight: {
            type: 'string'
        }
    }
};

module.exports = TagsDefaultSchema;