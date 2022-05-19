const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {type:String, required: true},
        points: {type: Number, required: true, default: 0},
        createdDate: { type: Date, default: Date.now },
        retry: {type: Number, required: true, default: 5},
        completed: {type: [Schema.Types.ObjectId], ref: 'Problem', required: true, default: [] },
        attempted: {type: [Schema.Types.ObjectId], ref: 'Problem',  required: true, default: [] },
        favourite: {type: [Schema.Types.ObjectId], ref: 'Problem',  required: true, default: [] }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
