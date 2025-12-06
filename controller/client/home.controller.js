const Product = require('../../model/product.model')
const productsHelpers = require("../../helpers/products")
module.exports.index = async (req, res) => {
    // lấy ra thông tin các sản phẩm nổi bật

    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    }).limit(6);
    const newProductsFeatured = productsHelpers.priceNewProducts(productsFeatured)
    // kết thúc lấy ra thông tin các sản phẩm nổi bật

    // lấy ra thông tin các sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,

        status: "active"
    }).sort({ position: "desc" }).limit(6);
    const newProductsNew = productsHelpers.priceNewProducts(productsNew)
    // kết thức lấy ra thông tin các sản phẩm mới nhất

    res.render('client/pages/home/index.pug', { title: "Trang chủ", productsFeatured: newProductsFeatured, productsNew: newProductsNew });
}