const Account = require('../../model/account.model')
// [GET] /admin/account : Trang danh sách tài khoản
module.exports.index = async (req, res) => {

    const records = await Account.find({
        deleted: false
    })
    // console.log(records);
    res.render('admin/pages/account/index', { title: "Danh sách tài khoản", records: records })
}
module.exports.create = (req, res) => {
    res.render('admin/pages/account/create', { title: "Tạo tài khoản" })
}
module.exports.createPost = async (req, res) => {
    await Account.create(req.body);
    req.flash("success", "Tạo tài khoản thành công");
    res.redirect("/admin/account");
}
