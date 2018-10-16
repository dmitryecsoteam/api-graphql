const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OriginsSchema = new Schema({
    _id: Number,
    name: [String],
    name_en: String,
    iata: String,
    country_en: String
});

module.exports = mongoose.model('Origin', OriginsSchema, 'origins');