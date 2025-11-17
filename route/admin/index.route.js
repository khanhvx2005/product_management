const routeDashboard = require('./dashboard.route')
const routeProduct = require('./product.route')
const routeProductCategory = require('./productCategory.route')
module.exports = (app)=> {
    app.use("/admin" , routeDashboard)
    app.use("/admin/products" , routeProduct)
    app.use("/admin/products-category" , routeProductCategory)

}