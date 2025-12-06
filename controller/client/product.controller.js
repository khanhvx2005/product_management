const Product = require('../../model/product.model')
const productCategory = require('../../model/productCategory.model')

const productsHelpers = require("../../helpers/products")
const productsCategoryHeplers = require("../../helpers/products-category")

module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status: "active"
    }

    const products = await Product.find(find).sort({ position: "desc" });
    const newProducts = productsHelpers.priceNewProducts(products)


    res.render('client/pages/products/index.pug', { title: "Trang sản phẩm", products: newProducts });
}
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const products = await Product.findOne(find)

        res.render("client/pages/products/detail", { title: products.slug, products: products });
    } catch (error) {
        res.redirect("/products");
    }

}
module.exports.category = async (req, res) => {
    const category = await productCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false
    })
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
    const listSubCategory = await productsCategoryHeplers.getCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        products_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false,
        status: "active"
    }).sort({ position: "desc" })
    const newProducts = productsHelpers.priceNewProducts(products)

    res.render('client/pages/products/index.pug', { title: category.title, products: newProducts });


}