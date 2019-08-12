const graphqlServer = require('../server/serverExpress');
const axios = require('axios');

const url = `http://localhost:${process.env.API_PORT}/${process.env.API_CONTEXT_ROOT}`;
const method = 'POST';
const headers = { 'Content-Type': 'application/json' };


jest.mock('../models/Destination.js');
jest.mock('../models/Origin.js');
jest.mock('../models/Travel.js');
jest.mock('../models/User.js');
jest.mock('../auth/JWT.js');


let server;

beforeAll(async () => {
    server = await graphqlServer.init();
    //await mongo.connect();
});

afterAll(async () => {
    await server.close();
    console.log("Server stopped");
});

test('should respond to originStartsWith query with lowercase letter', async () => {

    const data = JSON.stringify({ query: '{originStartsWith(name: "t") { _id nameEn name iata countryEn } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should respond to destinationStartsWith query with lowercase letter', async () => {

    const data = JSON.stringify({ query: '{destinationStartsWith(name: "o") { _id nameEn name iata countryEn } }' })

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should respond to destinationRating with all parameters passed', async () => {

    const data = JSON.stringify({ query: '{destinationRating(museumRating: 3 beachRating: 3 foodRating: 3 shoppingRating: 3 nightlifeRating: 3 natureRating: 3) { _id name iata nameEn countryEn museumRating museumDescription beachRating beachDescription foodRating foodDescription shoppingRating shoppingDescription nightlifeRating nightlifeDescription natureRating natureDescription } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should respond to destination query', async () => {

    const data = JSON.stringify({ query: '{destination(_id: 3) { _id name iata nameEn countryEn museumRating museumDescription beachRating beachDescription foodRating foodDescription shoppingRating shoppingDescription natureRating natureDescription } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should respond to travel query', async () => {

    const data = JSON.stringify({ query: '{travel(origin: 1, destination: 2, date: "2019-07-07") { _id destination { _id nameEn countryEn } date priceAirplane priceHotel } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should respond to travelFull query', async () => {

    const data = JSON.stringify({ query: '{travelFull(_id: "5bbce95f81e97acfcd8e0a76") { _id destination { _id nameEn countryEn foundingDate } origin { nameEn } date priceAirplane priceHotel } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data).toMatchSnapshot();
});

test('should return current user info', async () => {
    
    const data = JSON.stringify({ query: '{currentUser { email name } }' });

    const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

    expect(response.data).toMatchSnapshot();
});

test('should return null for currentUser without auth header', async () => {

    const data = JSON.stringify({ query: '{currentUser { email name } }' });

    const response = await axios({ method, url, headers, data });

    expect(response.data.data.currentUser).toBeNull;
});

test('should return getNotifications for authorized user', async () => {

    const data = JSON.stringify({ query: '{getNotifications { travelId origin { nameEn } destination { nameEn } date priceAirplaneLast priceHotelLast } }' });

    const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

    expect(response.data).toMatchSnapshot();
});

test('should return "Unauthorized" for query without token', async () => {

    const data = JSON.stringify({ query: '{getNotifications { travelId origin { nameEn } destination { nameEn } date priceAirplaneLast priceHotelLast } }' });

    const response = await axios({ method, url, headers, data });
    
    expect(response.data).toMatchSnapshot();
});