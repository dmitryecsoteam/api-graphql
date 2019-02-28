const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OriginsSchema = new Schema({
    _id: Number,
    name: [String],
    nameEn: String,
    iata: String,
    countryEn: String
});

module.exports = mongoose.model('Origin', OriginsSchema, 'origins');