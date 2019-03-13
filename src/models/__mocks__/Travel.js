const Travel = {
    findOne: jest.fn(() => {
        return Promise.resolve({"_id":"5bbce95f81e97acfcd8e0a76","destination":1,"date":"2018-10-24","priceAirplane":53,"priceHotel":75})
    }),
    findById: jest.fn((_id) => {
        switch (_id) {
            case '5bbce95f81e97acfcd8e0a76': return Promise.resolve({"_id":"5bbce95f81e97acfcd8e0a76","destination":1,"date":"2018-10-24","priceAirplane":53,"priceHotel":25});
        }
    })
}

module.exports = Travel;