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

TravelSchema.statics.findMinPrices = (date) => {
    return TravelModel.aggregate([
        {
            $match:
            {
                "date": { $lt: date }
            }
        },
        {
            $group:
            {
                _id: "$origin",
                minAirplane: { $min: "$priceAirplane" },
                minHotel: { $min: "$priceHotel" }
            }
        }
    ]);
}

const TravelModel = mongoose.model('Travel', TravelSchema, 'travels');

module.exports = TravelModel;