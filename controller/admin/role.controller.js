const Role = require('../../model/role.model')
module.exports.index = async (req, res) => {

    const records = await Role.find({
        deleted: false
    })
    // console.log(records);
    res.render('admin/pages/role/index', { title: "Nhóm quyền", records: records })
}
module.exports.create = (req, res) => {
    res.render('admin/pages/role/create', { title: " Tạo nhóm quyền" })
}
module.exports.createPost = async (req, res) => {
    await Role.create(req.body);
    res.redirect("/admin/roles")
}