const Account = require('../../model/account.model')

module.exports.index = (req, res) => {
    res.render('admin/pages/my-account/index', { title: "Trang thông tin cá nhân" })
}
module.exports.edit = (req, res) => {
    res.render('admin/pages/my-account/edit', { title: "Trang chỉnh sửa thông tin cá nhân" })
}
module.exports.editPatch = async (req, res) => {
    await Account.updateOne({ _id: res.locals.user.id }, req.body)
    req.flash("success", "Cập nhập thông tin cá nhân thành công")
    const backURL = req.get("Referer");

    res.redirect(backURL);
}