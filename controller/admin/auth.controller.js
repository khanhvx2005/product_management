const { response } = require('express');
const Account = require('../../model/account.model')
var md5 = require('md5'); // Mã hóa thành 1 chuỗi string j đó.

module.exports.login = (req, res) => {
    if (req.cookies.token) {
        res.redirect("/admin/dashboard")
    } else {
        res.render("admin/pages/auth/login", { title: "Đăng nhập" })

    }
    // res.render("admin/pages/auth/login", { title: "Đăng nhập" })
}
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Account.findOne({
        deleted: false,
        email: email
    })
    if (!user) {
        req.flash("error", "Email không tồn tại !");
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu !");
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    res.cookie("token", user.token)
    res.redirect("/admin/dashboard")

}
module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}