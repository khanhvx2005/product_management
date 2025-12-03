// [GET] /admin/products
const Product = require('../../model/product.model')
const validate = require('../../validates/product.validate')
const productCategory = require('../../model/productCategory.model')
const Account = require('../../model/account.model')
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
        const reg = new RegExp(req.query.keyword, "i");
        find.title = reg;
        keyword = req.query.keyword;
    }
    const count = await Product.countDocuments(find)
    const panination = {
        currentPage: 1,
        limitItem: 4
    }
    if (req.query.page) {
        panination.currentPage = parseInt(req.query.page);
    }
    panination.skip = parseInt((panination.currentPage - 1) * panination.limitItem);
    panination.totalPage = Math.ceil(count / panination.limitItem);
    // sort
    const sort = {
    };
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // end sort
    // console.log(panination);
    const products = (await Product.find(find).sort(sort).limit(panination.limitItem).skip(panination.skip))
    for (const product of products) {
        const user = await Account.findOne({
            _id: product.createBy.account_id
        })
        if (user) {
            product.accountFullName = user.fullname;
        }
    }

    res.render('admin/pages/products/index', { title: "Trang sản phẩm", products: products, filter: filter, keyword: keyword, panination: panination })
}
// [PATCH] /admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({ _id: id }, { status: status })
    req.flash('success', 'Cập nhập sản phẩm thành công !');

    const backURL = req.get('Referer') || '/admin/products';
    res.redirect(backURL);
}
// [PATCH] /admin/products/change-status/
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(",");

    const backURL = req.get('Referer') || "/admin/products";
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: type })
            req.flash('success', 'Cập nhập trạng thái nhiều sản phẩm thành công !');
            res.redirect(backURL);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: type })
            req.flash('success', 'Cập nhập trạng thái sản phẩm thành công !');
            res.redirect(backURL);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteBy: {
                    account_id: res.locals.user.id,
                    deleteAt: new Date(),
                }
            })
            req.flash('success', 'Xóa sản phẩm thành công !');

            res.redirect(backURL);

            break;
        case "change-position":

            for (element of ids) {
                let [id, position] = element.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, { position: position })

            }


            req.flash('success', 'Thay đổi vị trí thành công !');

            res.redirect(backURL);

            break;
        default:
            break;
    }
}
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteBy: {
            account_id: res.locals.user.id,
            deleteAt: new Date(),
        }

    })
    req.flash('success', 'Xóa sản phẩm thành công !');
    const backURL = req.get("Referer") || "/admin/products";
    res.redirect(backURL);

}
// [GET] /admin/products/storage
module.exports.storage = async (req, res) => {

    const find = {
        deleted: true
    }
    const products = await Product.find(find);
    res.render('admin/pages/products/storage', { title: "Trang thùng rác", products: products })
}
// [PATCH] /admin/products/storage
module.exports.storagePatch = async (req, res) => {
    console.log(req.params);
    const backURL = req.get("Referer") || "admin/products";
    const id = req.params.id;

    switch (req.params.type) {
        case "restore":
            await Product.updateOne({ _id: id }, { deleted: false })
            req.flash('success', 'Khôi phục sản phẩm thành công !');

            res.redirect(backURL);
            break;
        case "delete":
            await Product.deleteOne({ _id: id })
            req.flash('success', 'Xóa vĩnh viễn sản phẩm thành công !');
            res.redirect(backURL);
            break;
        default:
            break;
    }
    // const id = req.params.id;
    // await Product.updateOne({ _id: id }, { deleted: false })
    // req.flash('success', 'Khôi phục sản phẩm thành công !');
    // const backURL = req.get("Referer") || "admin/products";

    // res.redirect(backURL);
}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    // console.log(res.locals.user);
    const find = {
        deleted: false
    }
    // Hàm xây dụng danh sách câu trúc

    const category = await productCategory.find(find)
    const newRecords = createTreeHelper.tree(category);
    res.render('admin/pages/products/create', { title: "Trang thêm mới sản phẩm", category: newRecords })
}
// [PATCH] /admin/products/create

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createBy = {
        account_id: res.locals.user.id
    }

    await Product.create(req.body);
    res.redirect("/admin/products");
}
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    const id = req.params.id;
    const products = await Product.findOne({ _id: id })
    const find = {
        deleted: false
    }
    // Hàm xây dụng danh sách câu trúc

    const category = await productCategory.find(find)
    const newRecords = createTreeHelper.tree(category);
    res.render('admin/pages/products/edit', { title: "Trang chỉnh sửa sản phẩm", products: products, category: newRecords })
}
// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    await Product.updateOne({ _id: req.params.id }, req.body)
    req.flash("success", "Chỉnh sửa thành công !");
    res.redirect("/admin/products")
}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const products = await Product.findOne({ _id: id });
    // console.log(products);
    res.render('admin/pages/products/detail', { title: "Trang chi tiết sản phẩm", products: products })
}

