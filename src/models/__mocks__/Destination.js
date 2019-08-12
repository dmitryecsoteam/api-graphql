const Destination = {
    find: jest.fn((args) => {
        
        // Response for destinationStartsWith query
        if (args.name) {
            return Promise.resolve([{"_id":1,"nameEn":"Osaka","name":["Osaka","Осака","大阪市","KIX","OSA","ITM"],"iata":"OSA","countryEn":"Japan"},{"_id":4,"nameEn":"Sapporo","name":["Sapporo","Саппоро","札幌市","SPK","CTS","OKD"],"iata":"SPK","countryEn":"Japan"}]);
        }

        // Response for destinationRating query
        if (args.museumRating) {
            return Promise.resolve([{"_id":5,"name":["Nagasaki","Нагасаки","長崎市","NGS"],"iata":"NGS","nameEn":"Nagasaki","countryEn":"Japan","museumRating":4,"museumDescription":"Pellentesque eu leo sed urna mattis suscipit eu eu tortor. Praesent auctor quam eu ex tristique pretium","beachRating":3,"beachDescription":"Ut tempor ex vel eleifend lobortis. Nunc vel tortor odio","foodRating":4,"foodDescription":"Proin pharetra ante est, eget convallis magna tempor id. Etiam vitae aliquet massa","shoppingRating":3,"shoppingDescription":"Ut tempor ex vel eleifend lobortis. Nunc vel tortor odio","nightlifeRating":5,"nightlifeDescription":"Quisque scelerisque congue magna a vestibulum. Donec sed tincidunt purus","natureRating":5,"natureDescription":"Pellentesque eu leo sed urna mattis suscipit eu eu tortor. Praesent auctor quam eu ex tristique pretium"}]);
        }
    }),
    findById: jest.fn((_id) => {
        switch (_id) {
            case 1: return Promise.resolve({"_id":1,"nameEn":"Osaka","name":["Osaka","Осака","大阪市","KIX","OSA","ITM"],"iata":"OSA","countryEn":"Japan","foundingDate":"1899"});
            case 2: return Promise.resolve({"_id":1,"nameEn":"Osaka","name":["Osaka","Осака","大阪市","KIX","OSA","ITM"],"iata":"OSA","countryEn":"Japan"});
            case 3: return Promise.resolve({"_id":3,"name":["Nagoya","Нагоя","名古屋市","NGO","NKM"],"iata":"NGO","nameEn":"Nagoya","countryEn":"Japan","museumRating":1,"museumDescription":"Ut tempor ex vel eleifend lobortis. Nunc vel tortor odio","beachRating":0,"beachDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","foodRating":2,"foodDescription":"Quisque scelerisque congue magna a vestibulum. Donec sed tincidunt purus","shoppingRating":4,"shoppingDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","nightlifeRating":0,"nightlifeDescription":"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam tortor elit, vehicula ut enim pharetra, sagittis fermentum nulla","natureRating":1,"natureDescription":"Ut tempor ex vel eleifend lobortis. Nunc vel tortor odio"});
        }
        
    })
}

module.exports = Destination;