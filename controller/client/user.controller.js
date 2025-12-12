const md5 = require('md5')
const User = require('../../model/user.model')
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", { title: "Trang đăng ký" })
}
module.exports.registerPost = async (req, res) => {
    const exitsEmail = await User.findOne({
        email: req.body.email
    })
    if (exitsEmail) {
        req.flash("error", "Email đã tồn tại")
        const backURL = req.get("Referer")
        res.redirect(backURL)
        return;
    } else {
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        await user.save()
        req.flash("success", "Đăng ký thành công")
        res.cookie("tokenUser", user.tokenUser)
        res.redirect("/")

    }
}
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", { title: "Trang đăng nhập" })

}
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        req.flash("error", "Email không tồn tại")
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    if (md5(req.body.password) !== user.password) {
        req.flash("error", "Sai mật khẩu")
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản bị khóa")
        const backURL = req.get("Referer");
        res.redirect(backURL);
        return;
    }
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/")
}