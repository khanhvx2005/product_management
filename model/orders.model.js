const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    user_id: String,
    cart_id: String,
    userInfo: {
        fullname: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            price: Number,
            quantity: Number,

            discountPercentage: Number
        }
    ],
    deleted: {
        type: Boolean, default: false
    },
    deletedAt: Date
}, { timestamps: true });
const Order = mongoose.model('Order', ordersSchema, "orders");
module.exports = Order;