const TagsDefaultSchema = require('./tagsDefaultSchema');

const IterationDefaultResponseSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['order'],
    properties: {
        id: {
          type: 'string'
        },
        order: {
            type: 'number'
        },
        tags: {
            type: 'object',
            items: TagsDefaultSchema
        }
    }
};

module.exports = IterationDefaultResponseSchema;