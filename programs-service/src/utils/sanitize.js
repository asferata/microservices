const lodash = require('lodash');

const removeExtraProperties = (model, schema) =>
    lodash.pick(model, schema);

const Sanitation = {
    removeExtraProperties
};

module.exports = Sanitation;