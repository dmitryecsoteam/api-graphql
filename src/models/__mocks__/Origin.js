const Origin = {
    find: jest.fn((args) => {
        if (args.name) {
            return Promise.resolve([{"_id":1,"nameEn":"Tokyo","name":["Tokyo","東京","Токио","TYO","NRT","HND"],"iata":"TYO","countryEn":"Japan"}]);
        }
    })
}

module.exports = Origin;