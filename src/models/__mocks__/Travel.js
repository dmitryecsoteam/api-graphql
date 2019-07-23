const mongoose = require('mongoose');

const Travel = {
    findOne: jest.fn(({ origin, destination, date }) => {

        if (origin === 1 && destination === 2 && date === '2019-07-07') return Promise.resolve({"_id":mongoose.Types.ObjectId("5bbce95f81e97acfcd8e0a76"),"destination":2,"origin":1,"date":"2019-07-07","priceAirplane":53,"priceHotel":75});

        if (origin === 1 && destination === 2 && date === '2019-08-09') return Promise.resolve({"_id":mongoose.Types.ObjectId("5c6c7e42e3b7e1edb974a40c"),"destination":2,"origin":1,"date":"2019-08-09","priceAirplane":53});

        else return Promise.resolve(null);


    }),
    findById: jest.fn((_id) => {
        
            if (_id === '5bbce95f81e97acfcd8e0a76') return Promise.resolve({"_id":"5bbce95f81e97acfcd8e0a76","destination":1,"origin":2,"date":"2018-10-24","priceAirplane":53,"priceHotel":25});
        
            if (_id.equals('5d239408f05e9620082a2419')) return Promise.resolve({"_id":mongoose.Types.ObjectId("5bbce95f81e97acfcd8e0a76"),"destination":2,"origin":1,"date":"2019-07-07","priceHotel":25});

            if (_id.equals('5c6c7e42e3b7e1edb974a40c')) return Promise.resolve({"_id":mongoose.Types.ObjectId("5c6c7e42e3b7e1edb974a40c"),"destination":2,"origin":1,"date":"2019-08-09","priceAirplane":53,"priceHotelLast":80});

            if (_id.equals('5c6c7e42e3b7e1edb974a40d')) return Promise.resolve(null);
    })
}

module.exports = Travel;