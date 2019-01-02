const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const baseSchemaOptions = require('./baseSchemaOptions');

const tagsSchema = new mongoose.Schema({
    _id: false,
    count: String,
    time: String,
    distance: String,
    flection: String,
    speed: String,
    weight: String
},{timestamps: true});

const iterationSchema = new mongoose.Schema({
    order: Number,
    tags: [tagsSchema]
}, Object.assign({}, {timestamps: true}, baseSchemaOptions));

const exerciseSchema = new mongoose.Schema({
    title: String,
    order: Number,
    comment: String,
    iterations: [iterationSchema]
}, Object.assign({}, {timestamps: true}, baseSchemaOptions));

const programSchema =  new mongoose.Schema(Object.assign({}, {
    title: String,
    notes: String,
    exercises: [exerciseSchema]
}), Object.assign({}, {timestamps: true}, baseSchemaOptions));

module.exports = mongoose.model('Program', programSchema);