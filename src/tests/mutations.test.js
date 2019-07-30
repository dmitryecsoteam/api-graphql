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

const save = require('../models/User').save;

let server;

beforeAll(async () => {
    server = await graphqlServer.init();
});

afterAll(async () => {
    await server.close();
    console.log("Server stopped");
});

describe('signinUser mutation', () => {
    test('should signin user and return token', async () => {

        const data = JSON.stringify({ query: 'mutation {signinUser(email: "test@mail.com", password: "XXX") { token }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
    });

    test('should return error if user doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {signinUser(email: "randomUser@mail.com", password: "XXX") { token }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
    });

    test('should return error if password doesn\'t match', async () => {

        const data = JSON.stringify({ query: 'mutation {signinUser(email: "test@mail.com", password: "YYY") { token }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
    });
});

describe('signupUser mutation', () => {
    test('should sign up new user and return token', async () => {

        const data = JSON.stringify({ query: 'mutation {signupUser(email: "test1@mail.com", password: "XXX1", name: "User Name1") { token }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
    });

    test('should not sign up existing user and return error', async () => {

        const data = JSON.stringify({ query: 'mutation {signupUser(email: "test@mail.com", password: "XXX1", name: "User Name1") { token }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
    });
});

describe('addNotification mutation', () => {
    test('should add new notification by id to existing user', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(id: "5d239408f05e9620082a2419") { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should add new notification by date/origin/dest to existing user', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(date: "2019-07-07", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should not add notification by id if it already exists', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(id: "5c6c7e42e3b7e1edb974a40c", date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification by date/origin/dest if it already exists', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification if user doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer non_exist_user_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification by id if id doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(id: "5c6c7e42e3b7e1edb974a40d", date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification by date/origin/dest if date is past or out of range', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(date: "2000-01-10", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification by date/origin/dest if origin or destination doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(date: "2019-07-08", origin: 100, destination: 200) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not add notification without authorization token', async () => {

        const data = JSON.stringify({ query: 'mutation {addNotification(id: "5d239408f05e9620082a2419", date: "2019-07-07", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

});

describe('deleteNotification mutation', () => {
    test('should delete notification', async () => {

        const data = JSON.stringify({ query: 'mutation {deleteNotification(id: "5c6c7e42e3b7e1edb974a40c") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });
        
        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should return error if user doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {deleteNotification(id: "5c6c7e42e3b7e1edb974a40c") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer non_exist_user_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should return error if notification doesn\'t exist', async () => {

        const data = JSON.stringify({ query: 'mutation {deleteNotification(id: "5c6c7e42e3b7e1edb974a40d") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers: { ...headers, Authorization: 'Bearer valid_token' }, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });

    test('should not delete notification without authorization token', async () => {

        const data = JSON.stringify({ query: 'mutation {deleteNotification(id: "5c6c7e42e3b7e1edb974a40c") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' });

        const response = await axios({ method, url, headers, data });

        expect(response.data).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(0);
    });
});