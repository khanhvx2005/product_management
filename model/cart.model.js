const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id: String,
    products: [
        {
            product_id: String,
            quantity: Number
        }
    ]
}, { timestamps: true });
const Cart = mongoose.model('Cart', cartSchema, "carts");
module.exports = Cart;

// Tại vì sao trong giỏ hàng không cần trường deleted vì giỏ hàng chỉ lưu trữ tạm thời khi mà thanh toán thành công sau đó dữ
//  liệu trong giỏ hàng sẽ xóa sạch để chuẩn bị cho lần mua sau



