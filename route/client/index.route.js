const routeHome = require('./home.route')
const routeProducts = require('./product.route')
const routeSearch = require('./search.route')
const routeCart = require('./cart.route')
const routeCheckout = require('./checkout.route')
const routeUser = require('./user.route')

const cartMiddleware = require('../../middlewares/client/cart.middleware')
const categoryMiddleware = require('../../middlewares/client/category.middleware')
const userMiddleware = require("../../middlewares/client/user.middleware")
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)
    app.use(userMiddleware.infoUser)

    app.use('/', routeHome)
    app.use('/products', routeProducts)
    app.use('/search', routeSearch)
    app.use('/cart', routeCart)
    app.use('/checkout', routeCheckout)
    app.use('/user', routeUser)




}
