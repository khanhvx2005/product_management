module.exports.register = (req, res, next) => {
    if (!req.body.fullname) {
        req.flash("error", "Vui lòng nhập họ tên !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập password !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }

    next()
}
module.exports.loginPost = (req, res, next) => {

    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập password !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }

    next()
}
module.exports.forgotPassword = (req, res, next) => {

    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }


    next()
}
module.exports.otpPassword = (req, res, next) => {

    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (!req.body.otp) {
        req.flash("error", "Vui lòng nhập mã otp !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }


    next()
}
module.exports.resetPasswordPost = (req, res, next) => {

    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập email !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (!req.body.confirmPassword) {
        req.flash("error", "Vui lòng xác nhận mật khẩu !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Mật khẩu không khớp !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }


    next()
}