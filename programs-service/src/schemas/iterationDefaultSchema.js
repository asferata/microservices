const TagsDefaultSchema = require('./tagsDefaultSchema');

const IterationDefaultSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['order'],
    properties: {
        order: {
            type: 'number'
        },
        tags: {
            type: 'object',
            items: TagsDefaultSchema
        }
    }
};

module.exports = IterationDefaultSchema;