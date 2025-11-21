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
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productCategory.findOne({
            _id: id,
            deleted: false
        })
        const records = await productCategory.find({ deleted: false })
        const newRecords = createTreeHelper.tree(records);
        res.render('admin/pages/productCategory/edit', { title: "Trang chỉnh sửa danh mục", data: data, records: newRecords })
    } catch (error) {
        res.redirect("/admin/products-category")
    }
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await productCategory.updateOne({ _id: id }, req.body)
    res.redirect("/admin/products-category")
}