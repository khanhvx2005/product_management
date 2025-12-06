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
module.exports.permissions = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Role.find(find)
    res.render('admin/pages/role/permissions', {
        title: "Phân quyền",
        records: records
    })
}
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        const id = item.id;
        const permissions = item.permissions;
        await Role.updateOne({ _id: id }, { permissions: permissions })
    }
    req.flash("success", "Phân quyền thành công");
    const backURL = req.get("Referer") || "/admin/roles";
    res.redirect(backURL);
}
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const records = await Role.findOne({
        _id: id,
        deleted: false
    })
    res.render('admin/pages/role/detail', { title: "Trang chi tiết nhóm quyền", records: records })
}
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, {
        deleted: true

    })
    req.flash('success', 'Xóa nhóm quyền thành công !');
    const backURL = req.get("Referer") || "/admin/products";
    res.redirect(backURL);

}
module.exports.edit = async (req, res) => {

    const id = req.params.id;
    const records = await Role.findOne({ _id: id, deleted: false })




    res.render('admin/pages/role/edit', { title: "Trang chỉnh sửa nhóm quyền", records: records })
}
module.exports.editPatch = async (req, res) => {


    await Role.updateOne({ _id: req.params.id }, req.body)
    req.flash("success", "Chỉnh sửa thành công !");
    res.redirect("/admin/roles")
}
