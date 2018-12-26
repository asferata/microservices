const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const programSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    tasks: [{type: ObjectId, ref: 'Task'}]
}, { timestamps: true});

programSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model('Program', programSchema);