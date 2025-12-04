const authMiddleware = require('../../middlewares/auth.middleware')
const routeDashboard = require('./dashboard.route')
const routeProduct = require('./product.route')
const routeProductCategory = require('./productCategory.route')
const routeRole = require('./role.route')
const routeAccount = require('./account.route')
const routeAuth = require('./auth.route')
const routeMyAccount = require('./my-account.route')

module.exports = (app) => {
    app.use("/admin/dashboard", authMiddleware.requireAuth, routeDashboard)
    app.use("/admin/products", authMiddleware.requireAuth, routeProduct)
    app.use("/admin/products-category", authMiddleware.requireAuth, routeProductCategory)
    app.use("/admin/roles", authMiddleware.requireAuth, routeRole)
    app.use("/admin/account", authMiddleware.requireAuth, routeAccount)
    app.use("/admin/auth", routeAuth)
    app.use("/admin/my-account", authMiddleware.requireAuth, routeMyAccount)


}