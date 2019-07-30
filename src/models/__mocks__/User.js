const mongoose = require('mongoose');
const save = jest.fn();

function User({ _id, email, password, name, notifications }) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.notifications = notifications;

    this.save = save;
    this.select = (fields) => {
        if (fields.notifications === 1 && fields._id === 0) {
            return { notifications }
        }
    }
}

// Static property
User.findOne = ({ email }) => {
    if (email === 'test@mail.com') {
        return new User({
            _id: mongoose.Types.ObjectId('5c6c7e42e3b7e1edb974a40c'),
            email: 'test@mail.com',
            password: 'XXX',
            name: 'Andrew',
            notifications: [
                {
                    travelId: mongoose.Types.ObjectId('5c6c7e42e3b7e1edb974a40c'),
                    date: '2019-08-09',
                    priceAirplaneLast: null,
                    priceHotelLast: 75
                }
            ]
        });
    }
    else {
        return null;
    }
}

const myModule = module.exports = User;
myModule.save = save;
