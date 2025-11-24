const Account = require('../../model/account.model')
// [GET] /admin/account : Trang danh sách tài khoản
module.exports.index = async (req, res) => {

    const records = await Account.find({
        deleted: false
    })
    // console.log(records);
    res.render('admin/pages/account/index', { title: "Danh sách tài khoản", records: records })
}
