const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelScema = new Schema({
    //_id: String,
    origin: Number,
    destination: Number,
    date: String,
    priceAirplane: Number,
    weatherTempStatMax: Number,
    weatherTempStatMin: Number,
    carDuration: Number,
    carDistance: Number
});

module.exports = mongoose.model('Travel', TravelScema, 'travels');