const routeHome = require('./home.route')
const routeProducts = require('./product.route')
module.exports = (app) => {
    app.use('/', routeHome)
    app.use('/products', routeProducts)
}