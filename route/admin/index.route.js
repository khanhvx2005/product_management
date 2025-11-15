const routeDashboard = require('./dashboard.route')
const routeProduct = require('./product.route')
module.exports = (app)=> {
    app.use("/admin" , routeDashboard)
    app.use("/admin/products" , routeProduct)
}