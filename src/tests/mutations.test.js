const graphqlServer = require('../server/server');

const url = `http://localhost:${process.env.API_PORT}/${process.env.API_CONTEXT_ROOT}`

jest.mock('../models/Destination.js');
jest.mock('../models/Origin.js');
jest.mock('../models/Travel.js');
jest.mock('../models/User.js');
jest.mock('../auth/JWT.js');

const save = require('../models/User').save;

beforeAll(async () => {
    await graphqlServer.init();
});

afterAll(async () => {
    await graphqlServer.server.stop();
    console.log("Server stopped");
});

describe('signupUser mutation', () => {
    test('should sign up new user and return token', async () => {

        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {signupUser(email: "test1@mail.com", password: "XXX1", name: "User Name1") { token }}' })
        };
    
        const response = await graphqlServer.server.inject(injectOptions);
    
        expect(response.result).toMatchSnapshot();
    });
    
    test('should not sign up existing user and return error', async () => {
    
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {signupUser(email: "test@mail.com", password: "XXX1", name: "User Name1") { token }}' })
        };
    
        const response = await graphqlServer.server.inject(injectOptions);
        expect(response.result).toMatchSnapshot();
    });
});

describe('addNotification mutation', () => {
    test('should add new notification by id to existing user', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {addNotification(email: "test@mail.com", id: "5d239408f05e9620082a2419", date: "2019-07-07", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(response.result).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should add new notification by date/origin/dest to existing user', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {addNotification(email: "test@mail.com", date: "2019-07-07", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(response.result).toMatchSnapshot();
        expect(save).toHaveBeenCalledTimes(1);
    });

    test('should not add notification by id if it already exists', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {addNotification(email: "test@mail.com", id: "5c6c7e42e3b7e1edb974a40c", date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast } }}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(0);
        expect(response.result).toMatchSnapshot();
    });

    test('should not add notification by date/origin/dest if it already exists', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {addNotification(email: "test@mail.com", date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(0);
        expect(response.result).toMatchSnapshot();
    });

    test('should not add notification if user doesn\'t exist', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {addNotification(email: "random_user@mail.com", date: "2019-08-09", origin: 1, destination: 2) { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(0);
        expect(response.result).toMatchSnapshot();
    });
});

describe('deleteNotification mutation', () => {
    test('should delete notification', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {deleteNotification(email: "test@mail.com", id: "5c6c7e42e3b7e1edb974a40c") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(1);
        expect(response.result).toMatchSnapshot();
    });

    test('should return error if user doesn\'t exist', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {deleteNotification(email: "random_user@mail.com", id: "5c6c7e42e3b7e1edb974a40c") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(0);
        expect(response.result).toMatchSnapshot();
    });

    test('should return error if notification doesn\'t exist', async () => {
        const injectOptions = {
            method: 'POST',
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            payload: JSON.stringify({ query: 'mutation {deleteNotification(email: "test@mail.com", id: "5c6c7e42e3b7e1edb974a40d") { email notifications { travelId date priceAirplaneLast priceHotelLast }}}' })
        };

        const response = await graphqlServer.server.inject(injectOptions);
        expect(save).toHaveBeenCalledTimes(0);
        expect(response.result).toMatchSnapshot();
    });
});