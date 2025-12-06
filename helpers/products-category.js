const productCategory = require('../model/productCategory.model')

const getSubCategory = async (parentId) => {
    const subs = await productCategory.find({
        parent_id: parentId,
        deleted: false,
        status: "active"
    });
    let allSub = [...subs];
    for (const sub of subs) {
        const childs = await getSubCategory(sub.id)
        allSub = allSub.concat(childs);
    }
    return allSub;
}
module.exports.getCategory = async (parentId) => {
    const result = await getSubCategory(parentId);
    return result;
}