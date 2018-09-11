const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TravelScema = new Schema({
    origin: String,
    destination: String,
    date: Number,
    priceAirplane: Number,
    weatherTempStat: Number,
    weatherConditionStat: String
})

module.exports = mongoose.model('Travel', TravelScema, 'travels')