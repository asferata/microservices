const ProfileSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        type: {
            type: 'string'
        },
        company: {
            type: 'string'
        },
        profession: {
            type: 'string'
        }
    }
};

/*
schema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};*/

const UserSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['firstName', 'lastName', 'email', 'password'],
    properties: {
        firstName: {
            type: 'string',
            // format: 'alphanumeric',
            minLength: 2,
            maxLength: 50
        },
        lastName: {
            type: 'string',
            // format: 'alphanumeric',
            minLength: 2,
            maxLength: 50
        },
        birthDate: {
            type: 'string',
            format: 'date'
        },
        email: {
            type: 'string',
            format: 'email',
            minLength: 3,
            maxLength: 129
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20
        },
        profiles: {
            type: 'array',
            items: ProfileSchema
        }
    }
};

module.exports = UserSchema;