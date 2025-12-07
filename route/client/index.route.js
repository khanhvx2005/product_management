const routeHome = require('./home.route')
const routeProducts = require('./product.route')
const routeSearch = require('./search.route')

const categoryMiddleware = require('../../middlewares/client/category.middleware')
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use('/', routeHome)
    app.use('/products', routeProducts)
    app.use('/search', routeSearch)

}
