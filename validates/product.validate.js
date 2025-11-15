module.exports.create = (req,res,next)=> {
    if(!req.body.title) {
        req.flash("error" , "Vui lòng nhập tiêu đề !")
        const backURL = req.get("Referer") || "/admin/products";
        res.redirect(backURL);
        return;
    }
    next()
}