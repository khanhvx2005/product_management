const productCategory = require('../../model/productCategory.model')
module.exports.index =async (req, res) => {
    const find = {
        deleted: false
    }
    const products = await productCategory.find(find)

    res.render('admin/pages/productCategory/index', { title: "Trang danh mục sản phẩm" , products:products})
}
module.exports.create = (req, res) => {
    res.render('admin/pages/productCategory/create', { title: "Tạo danh mục sản phẩm" })
}
module.exports.createPost = async (req, res) => {

    if (req.body.position == "") {
        const count = await productCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    await productCategory.create(req.body);
    res.redirect("/admin/products-category");
}