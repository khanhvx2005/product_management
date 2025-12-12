const User = require("../../model/user.model")
module.exports.infoUser = async (req, res) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        })
        if (user) {
            res.locals.user = user;
        }
    }
}