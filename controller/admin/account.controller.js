const Account = require('../../model/account.model')
const Role = require('../../model/role.model')

var md5 = require('md5'); // Mã hóa thành 1 chuỗi string j đó.
// [GET] /admin/account : Trang danh sách tài khoản
module.exports.index = async (req, res) => {
    // Lấy ra danh sách tài khoản chưa bị xóa và ko có thuộc tính password và token
    const records = await Account.find({
        deleted: false
    }).select("-password -token");
    // End Lấy ra danh sách tài khoản chưa bị xóa và ko có thuộc tính password và token

    // Mục đích thay thế id của nhóm quyền bằng title nhóm quyền
    for (const element of records) {
        const role = await Role.findOne({
            _id: element.role_id,
            deleted: false
        })
        element.role = role;
    }
    // End Mục đích thay thế id của nhóm quyền bằng title nhóm quyền

    res.render('admin/pages/account/index', { title: "Danh sách tài khoản", records: records })
}
//[GET] /admin/account : Trang tạo mới tài khoản
module.exports.create = async (req, res) => {
    // Lấy ra danh sách nhóm quyền để truyền vào trường phân quyền 
    const roles = await Role.find({
        deleted: false
    })
    // End  Lấy ra danh sách nhóm quyền để truyền vào trường phân quyền 

    res.render('admin/pages/account/create', { title: "Tạo tài khoản", roles: roles })
}
//[POST] /admin/account : Tính năng thêm mới tài khoản vào DB
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password) // Mã hóa mật khẩu thành 1 chuỗi string random

    // Tìm trong DB có email người dùng nhập đã tồn tại chưa ?
    const emailExis = await Account.findOne({
        deleted: false,
        email: req.body.email
    })
    // Nếu có tồn tại trong DB thì in thông báo email đã tồn tại
    if (emailExis) {
        req.flash("error", "Email này đã tồn tại !");
        const backURL = req.get("Referer") || "/admin/account";
        res.redirect(backURL);
    }
    // Nếu không cho người dùng tạo tài khoản
    else {
        await Account.create(req.body);
        req.flash("success", "Tạo tài khoản thành công");
        res.redirect("/admin/account");
    }

}
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
        _id: id,
        deleted: false
    }
    const roles = await Role.find({
        deleted: false
    })
    const records = await Account.findOne(find)
    res.render('admin/pages/account/edit', { title: "Chỉnh sửa tài khoản", records: records, roles: roles })
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;


    const emailExis = await Account.findOne({
        _id: { $ne: id },
        deleted: false,
        email: req.body.email
    })

    if (emailExis) {
        req.flash("error", "Email này đã tồn tại !");
        const backURL = req.get("Referer") || "/admin/account";
        res.redirect(backURL);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password;
        }
        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhập tài khoản thành công!");
        res.redirect("/admin/account")

    }
}