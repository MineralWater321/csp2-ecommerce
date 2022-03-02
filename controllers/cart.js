const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../auth");

module.exports.addToCart = async (reqParams, adminData) => {
    let cartInfo = await Cart.findOne({ userId: adminData.id, producId: reqParams.productId }).then(result => {
        return result;
    })

    let productInfo = await Product.findById(reqParams.productId).then(result => {
        return result;
    })

    if (cartInfo) {
        let updateAmount = {
            amount: cartInfo.amount + 1,
        }

        return Cart.findByIdAndUpdate(cartInfo._id, updateAmount).then((product, error) => {
            if (error) {
                return false;
            }
            else {
                return true;
            }
        })
    }

    //Checks if user is admin
    if (!adminData.isAdmin) {
        //Checks if product is for sale
        if (productInfo.isActive) {
            let newCart = new Cart({
                userId: adminData.id,
                productId: reqParams.productId
            })
            return newCart.save().then((user, error) => {
                if (error) {
                    return false;
                }
                else {
                    return true;
                }
            })
        }
        else {
            return (`notOnSale`)
        }
    }
    else {
        return (`noAdmin`);
    }
}