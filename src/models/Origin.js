const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OriginsSchema = new Schema({
    _id: Number,
    name: String,
    iata: String,
    country: String
});

module.exports = mongoose.model('Origin', OriginsSchema, 'origins');