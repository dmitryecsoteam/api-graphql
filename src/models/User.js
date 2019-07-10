const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    name: String,
    password: String,
    notifications: [Object]
});

module.exports = mongoose.model('User', UserSchema, 'users');