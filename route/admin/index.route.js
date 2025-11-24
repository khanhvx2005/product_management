const routeDashboard = require('./dashboard.route')
const routeProduct = require('./product.route')
const routeProductCategory = require('./productCategory.route')
const routeRole = require('./role.route')
const routeAccount = require('./account.route')
module.exports = (app) => {
    app.use("/admin", routeDashboard)
    app.use("/admin/products", routeProduct)
    app.use("/admin/products-category", routeProductCategory)
    app.use("/admin/roles", routeRole)
    app.use("/admin/account", routeAccount)


}