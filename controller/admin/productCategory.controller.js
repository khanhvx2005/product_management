const productCategory = require('../../model/productCategory.model')
// [GET] /admin/product-category
const createTreeHelper = require('../../helpers/createTree')
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const filter = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    if (req.query.status) {
        find.status = req.query.status;
        const index = filter.findIndex((item) => (item.status == req.query.status));
        filter[index].class = "active";
    } else {
        const index = filter.findIndex((item) => (item.status == ""));
        filter[index].class = "active";
    }
    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
        const reg = new RegExp(req.query.keyword, "i");
        find.title = reg;
    }

    const records = await productCategory.find(find)
    if (req.query.status) {
        res.render('admin/pages/productCategory/index', { title: "Trang danh mục sản phẩm", filter: filter, records: records, keyword: keyword })

    } else {
        const newRecords = createTreeHelper.tree(records);
        res.render('admin/pages/productCategory/index', { title: "Trang danh mục sản phẩm", records: newRecords, filter: filter, keyword: keyword })
    }


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
    req.body.createdBy = {
        account_id: res.locals.user.id
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
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await productCategory.updateOne({ _id: id }, { status: status })
    req.flash('success', 'Cập nhập sản phẩm thành công !');

    const backURL = req.get('Referer') || '/admin/products';
    res.redirect(backURL);
}
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");

    const backURL = req.get('Referer') || "/admin/products";
    switch (type) {
        case "active":
            await productCategory.updateMany({ _id: { $in: ids } }, { status: type })
            req.flash('success', 'Cập nhập trạng thái nhiều sản phẩm thành công !');
            res.redirect(backURL);
            break;
        case "inactive":
            await productCategory.updateMany({ _id: { $in: ids } }, { status: type })
            req.flash('success', 'Cập nhập trạng thái sản phẩm thành công !');
            res.redirect(backURL);
            break;
        case "delete-all":
            await productCategory.updateMany({ _id: { $in: ids } }, { deleted: true })
            req.flash('success', 'Xóa sản phẩm thành công !');

            res.redirect(backURL);

            break;
        case "change-position":

            for (element of ids) {
                let [id, position] = element.split("-");
                position = parseInt(position);
                await productCategory.updateOne({ _id: id }, { position: position })

            }


            req.flash('success', 'Thay đổi vị trí thành công !');

            res.redirect(backURL);

            break;
        default:
            break;
    }
}
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await productCategory.updateOne({ _id: id }, { deleted: true })
    req.flash('success', 'Xóa danh mục thành công !');
    const backURL = req.get("Referer") || "/admin/products";
    res.redirect(backURL);

}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const products = await productCategory.findOne({ _id: id });
    // console.log(products);
    res.render('admin/pages/productCategory/detail', { title: "Trang chi tiết sản phẩm", products: products })
}