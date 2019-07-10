const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
    //_id: String,
    origin: Number,
    destination: Number,
    date: String,
    priceAirplane: Number,
    priceHotel: Number,
    weatherTempStatMax: Number,
    weatherTempStatMin: Number,
    carDuration: Number,
    carDistance: Number
});

module.exports = mongoose.model('Travel', TravelSchema, 'travels');