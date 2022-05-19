//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Problem schema
const schema = new Schema({
    points: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    description: { type: String, required: true },
    task: { type: String, required: true },
    answer: { type: String, required: true },
    hints: {type: String, required: false},
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Problem', schema);


