const Product = require('../../model/product.model')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status:"active"
    }

    const products = await Product.find(find).sort({ position: "desc" });
    
    products.forEach(item => {
        item.priceNew = (item.price * ((100 - item.discountPercentage) / 100)).toFixed();
    });
    res.render('client/pages/products/index.pug', { title: "Trang sản phẩm", products: products });
}
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted:false,
            slug: req.params.slug,
            status:"active"
        }
        const products = await Product.findOne(find)
        
        res.render("client/pages/products/detail", { title: products.slug, products: products });
    }catch(error) {
        res.redirect("/products");
    }
    
}