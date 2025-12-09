const Cart = require("../../model/cart.model")
const Product = require("../../model/product.model")
const productsHelpers = require("../../helpers/products")
module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })
    for (const item of cart.products) {
        const productInfo = await Product.findOne({
            _id: item.product_id
        })
        productInfo.priceNew = productsHelpers.priceNewProduct(productInfo)
        item.productInfo = productInfo;
        item.totalPrice = productInfo.priceNew * item.quantity;
    }
    cart.totalPrice = cart.products.reduce((total, item) => total + item.totalPrice, 0)
    res.render("client/pages/cart/index", { title: "Trang giỏ hàng", cartDetail: cart })
}
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId; // lấy ra id của sản phẩm
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const objProducts = {
        product_id: productId,
        quantity: quantity
    }
    const cart = await Cart.findOne({
        _id: cartId
    })
    const exitsProduct = cart.products.find((item) => item.product_id == productId)
    if (exitsProduct) {
        const quantityNew = quantity + exitsProduct.quantity;
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": quantityNew
            }
        })
        const backURL = req.get("Referer");
        req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
        res.redirect(backURL)
    } else {
        await Cart.updateOne({ _id: cartId }, { $push: { products: objProducts } })
        const backURL = req.get("Referer");
        req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công")
        res.redirect(backURL)
    }

}
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: { products: { product_id: productId } }
    })
    req.flash("success", "Xóa sản phẩm thành công !")
    const backURL = req.get("Referer")
    res.redirect(backURL)
}

module.exports.update = async (req, res) => {
    try {
        const productId = req.params.productId;
        const quantity = parseInt(req.params.quantity);
        const cartId = req.cookies.cartId; // Lấy mã giỏ hàng từ cookie

        // 1. Tìm giỏ hàng và cập nhật số lượng cho sản phẩm đó
        await Cart.updateOne(
            {
                _id: cartId,
                "products.product_id": productId
            },
            {
                $set: {
                    "products.$.quantity": quantity // Dấu $ đại diện cho sản phẩm tìm thấy ở trên
                }
            }
        );

        // 2. Cập nhật xong thì quay lại trang giỏ hàng
        req.flash("success", "Cập nhập số lượng thành công!")
        const backURL = req.get("Referer")
        res.redirect(backURL);

    } catch (error) {
        console.log(error);
        const backURL = req.get("Referer")
        res.redirect(backURL);
    }
};