const Product = require('../../model/product.model')
const productsHelpers = require("../../helpers/products")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        featured: "1",
        status: "active"
    }
    const productsFeatured = await Product.find(find);
    const newProducts = productsHelpers.priceNewProducts(productsFeatured)

    res.render('client/pages/home/index.pug', { title: "Trang chủ", productsFeatured: newProducts });
}