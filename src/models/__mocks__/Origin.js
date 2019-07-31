const Origin = {
    find: jest.fn((args) => {
        if (args.name) {
            return Promise.resolve([{"_id":1,"nameEn":"Tokyo","name":["Tokyo","東京","Токио","TYO","NRT","HND"],"iata":"TYO","countryEn":"Japan"}]);
        }
    }),
    findById: jest.fn((_id) => {
        switch (_id) {
            case 1: return Promise.resolve({"_id":1,"nameEn":"Tokyo","name":["Tokyo","東京","Токио","TYO","NRT","HND"],"iata":"TYO","countryEn":"Japan"});
            case 2: return Promise.resolve({"_id":2,"nameEn":"Osaka","name":["Osaka","Осака","大阪市","KIX","OSA","ITM"],"iata":"OSA","countryEn":"Japan"});
            default: return null;
        }
    })
}

module.exports = Origin;