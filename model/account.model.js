const mongoose = require('mongoose')
const generate = require('../helpers/ganerate')
const accountSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    role_id: String,
    phone: String,
    avatar: String,
    status: String,
    deletedAt: Date,
    deleted: {
        type: Boolean, default: false
    },
}, { timestamps: true });
const Account = mongoose.model('Account', accountSchema, "account");
module.exports = Account;