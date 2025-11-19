const productCategory = require('../../model/productCategory.model')
// [GET] /admin/product-category
const createTreeHelper = require('../../helpers/createTree')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await productCategory.find(find)
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/productCategory/index', { title: "Trang danh mục sản phẩm", records: newRecords })
}
// [GET] /admin/product-category/create

module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }
    // Hàm xây dụng danh sách câu trúc

    const records = await productCategory.find(find)
    const newRecords = createTreeHelper.tree(records);

    res.render('admin/pages/productCategory/create', { title: "Tạo danh mục sản phẩm", records: newRecords })
}
// [PATCH] /admin/product-category/create
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