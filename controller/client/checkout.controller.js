const Cart = require("../../model/cart.model")
const Product = require("../../model/product.model")
const productsHelpers = require("../../helpers/products")
const Order = require('../../model/orders.model')
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })
    for (const item of cart.products) {
        const productInfo = await Product.findOne({
            _id: item.product_id
        })
        productInfo.priceNew = productsHelpers.priceNewProduct(productInfo)
        item.productInfo = productInfo;
        item.totalPrice = productInfo.priceNew * item.quantity;
    }
    cart.totalPrice = cart.products.reduce((total, item) => total + item.totalPrice, 0)
    res.render("client/pages/checkout/index", { title: "Trang giỏ hàng", cartDetail: cart })
}
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({
        _id: cartId
    })
    const products = [];
    for (const product of cart.products) {
        const objProduct = {
            product_id: product.product_id,
            quantity: product.quantity,
            price: 0,
            discountPercentage: 0
        }
        const productInfo = await Product.findOne({
            _id: product.product_id
        })
        objProduct.price = productInfo.price;
        objProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objProduct)

    }
    const objOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }
    const order = new Order(objOrder)
    order.save();
    await Cart.updateOne({ _id: cartId }, { products: [] })
    res.redirect(`/checkout/success/${order.id}`);
}
module.exports.success = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.idOrder
    })
    for (const product of order.products) {
        const productInfo = await Product.findOne({ _id: product.product_id }).select("title thumbnail")
        product.productInfo = productInfo;
        const priceNew = productsHelpers.priceNewProduct(product)
        product.priceNew = priceNew;
        product.totalPrice = product.priceNew * product.quantity;
    }
    order.totalPrice = order.products.reduce((total, item) => total + item.totalPrice, 0)

    res.render("client/pages/checkout/success", { title: "Trang đặt hàng thành công", order: order })
}