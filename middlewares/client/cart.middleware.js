const Cart = require('../../model/cart.model')
module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();
        const expiresCookie = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiresCookie) })
    } else {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        if (cart) {
            cart.totalQuantity = cart.products.reduce((total, item) => total + item.quantity, 0)
            res.locals.miniCart = cart;
        } else {
            res.locals.miniCart = null;
        }

    }
    next()
}

















