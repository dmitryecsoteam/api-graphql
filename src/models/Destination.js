const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
    _id: Number,
    name: [String],
    cityDescription: String,
    population: String,
    iata: String,
    nameEn: String,
    countryEn: String,
    museumRating: Number,
    museumDescription: String,
    beachRating: Number,
    beachDescription: String,
    foodRating: Number,
    foodDescription: String,
    shoppingRating: Number,
    shoppingDescription: String,
    natureRating: Number,
    natureDescription: String,
    nightlifeRating: Number,
    nightlifeDescription: String
});

module.exports = mongoose.model('Destination', DestinationSchema, 'destinations');