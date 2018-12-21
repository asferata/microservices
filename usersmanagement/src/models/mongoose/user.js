const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const profileSchema = new mongoose.Schema({
    _id: ObjectId,
    type: String,
    profession: String,
    company: String
}, { timestamps: true});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    password: String,
    profiles: [profileSchema],
    tasks: [{type: ObjectId, ref: 'Task'}]
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);