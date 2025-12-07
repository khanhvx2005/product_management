const Product = require('../../model/product.model')
const productsHelpers = require("../../helpers/products")

module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let newProducts = [];
    if (keyword) {
        const regex = new RegExp(keyword, "i");
        const products = await Product.find({
            title: regex,
            deleted: false,
            status: "active"
        })
        newProducts = productsHelpers.priceNewProducts(products)
    }
    res.render("client/pages/search/index", { title: "Trang tìm kiếm", keyword: keyword, products: newProducts })
}