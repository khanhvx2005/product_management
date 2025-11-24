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
