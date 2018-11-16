const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelScema = new Schema({
    //_id: String,
    origin: Number,
    destination: Number,
    date: String,
    priceAirplane: Number
    //weatherTempStat: Number,
    //weatherConditionStat: String
});

module.exports = mongoose.model('Travel', TravelScema, 'travels');