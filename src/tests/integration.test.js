const graphqlServer = require('../server/server');
const mongo = require('../server/mongo');

const url = `http://localhost:${process.env.API_PORT}/${process.env.API_CONTEXT_ROOT}`

beforeAll(async () => {
    await graphqlServer.init();
    await mongo.connect();
});

test('should respond to originStartsWith query with capital letter', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{originStartsWith(name: "T") { _id name_en name iata country_en } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to originStartsWith query with lowercase letter', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{originStartsWith(name: "t") { _id name_en name iata country_en } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to destinationStartsWith query with capital letter', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{destinationStartsWith(name: "O") { _id name_en name iata country_en } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to destinationStartsWith query with lowercase letter', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{destinationStartsWith(name: "o") { _id name_en name iata country_en } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to destinationRating with all parameters passed', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{destinationRating(museumRating: 3 zooAquaRating: 3 wellnessSpaRating: 3 mountainsRating: 3 beachRating: 3 foodRating: 3 shoppingRating: 3 historicalRating: 3 natureRating: 3) { _id name iata name_en country_en museumRating museumDescription zooAquaRating zooAquaDescription wellnessSpaRating wellnessSpaDescription mountainsRating mountainsDescription beachRating beachDescription foodRating foodDescription shoppingRating shoppingDescription historicalRating historicalDescription natureRating natureDescription } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to destination query', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{destination(_id: 3) { _id name iata name_en country_en museumRating museumDescription zooAquaRating zooAquaDescription wellnessSpaRating wellnessSpaDescription mountainsRating mountainsDescription beachRating beachDescription foodRating foodDescription shoppingRating shoppingDescription historicalRating historicalDescription natureRating natureDescription } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to travel query', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{travel(origin: 1, destination: 1, date: "2018-10-24") { _id destination { _id name_en country_en } date priceAirplane } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);
    
    expect(response.result).toMatchSnapshot();
});

test('should respond to travelFull query', async () => {
    const injectOptions = {
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        payload: JSON.stringify({ query: '{travelFull(_id: "5bbce95f81e97acfcd8e0a76") { _id destination { _id name_en country_en } date priceAirplane } }' })
    };

    const response = await graphqlServer.server.inject(injectOptions);

    expect(response.result).toMatchSnapshot();
});


afterAll(async () => {
    await mongo.close();
    await graphqlServer.server.stop();
    console.log("Server stopped");
});
