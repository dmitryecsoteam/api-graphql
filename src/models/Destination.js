const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DestinationSchema = new Schema({
    _id: String,
    name: String,
    iata: String,
    country: String,
    museumRating: Number,
    museumDescription: String,
    zooAquaRating: Number,
    zooAquaDescription: String,
    wellnessSpaRating: Number,
    wellnessSpaDescription: String,
    mountainsRating: Number,
    mountainsDescription: String,
    beachRating: Number,
    beachDescription: String,
    foodRating: Number,
    foodDescription: String,
    shoppingRating: Number,
    shoppingDescription: String,
    historicalRating: Number,
    historicalDescription: String,
    natureRating: Number,
    natureDescription: String
})

module.exports = mongoose.model('Destination', DestinationSchema, 'destinations')