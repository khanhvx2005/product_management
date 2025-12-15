const md5 = require('md5')
const User = require('../../model/user.model')
const ganerateHelper = require('../../helpers/ganerate.js')
const ForgotPassword = require('../../model/forgot-password.model.js')
const sendMailHelper = require('../../helpers/sendMail.js')
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
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}
module.exports.forgotPassword = (req, res) => {
    res.render("client/pages/user/forgot-password", { title: "Trang quên mật khẩu" })
}
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email không tồn tại");
        const backURL = req.get("Referer")
        res.redirect(backURL)
        return;
    }
    const otp = ganerateHelper.generateRandomNumber(8)
    const objForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }
    const forgotPassword = new ForgotPassword(objForgotPassword)
    await forgotPassword.save()
    // Nếu tồn tại email gửi mã OTP qua email

    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `Mã OTP để lấy lại mật khẩu là <b>${otp}</b> . Thời hạn sử dụng 3 phút`
    sendMailHelper.sendMail(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`)
}
module.exports.otpPassword = (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", { title: "Trang nhập mã OTP", email: email })
}
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await ForgotPassword.findOne({
        otp: otp,
        email: email
    })
    if (!result) {
        req.flash("error", "Mã OTP không hợp lệ")
        const backURL = req.get("Referer")
        res.redirect(backURL)
        return;
    }
    const user = await User.findOne({
        email: email
    })
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/user/password/reset")
}
module.exports.resetPassword = (req, res) => {
    res.render("client/pages/user/reset", { title: "Trang đổi mật khẩu" })
}
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = res.cookie.tokenUser;
    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    })
    req.flash("success", "Đổi mật khẩu thành công")
    res.redirect("/")
}