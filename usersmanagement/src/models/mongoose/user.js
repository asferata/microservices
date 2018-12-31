const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new mongoose.Schema({
    _id: ObjectId,
    type: String,
    profession: String,
    company: String
}, { timestamps: true});

const userSchema = new mongoose.Schema(Object.assign({}, {
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    profiles: [profileSchema],
    tasks: [{type: ObjectId, ref: 'Task'}]
}), Object.assign({}, {timestamps: true}, baseSchema));


module.exports = mongoose.model('User', userSchema);