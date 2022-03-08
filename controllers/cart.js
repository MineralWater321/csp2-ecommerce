const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order")
const auth = require("../auth");


// TODO:
// 1. Add to Cart



module.exports.addToCart = async (reqParams, adminData) => {
    let cartInfo = await Cart.findOne({ userId: adminData.id, productId: reqParams.productId }).then(result => {
        return result;
    })

    let productInfo = await Product.findById(reqParams.productId).then(result => {
        return result;
    })

    if (cartInfo) {
        let updateAmount = {
            amount: cartInfo.amount + 1,
            totalPrice: cartInfo.totalPrice + productInfo.price,
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
                productId: reqParams.productId,
                totalPrice: productInfo.price
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
// Get cart items
module.exports.cartItems = async (adminData) => {

    let cartInfo = await Cart.find({ userId: adminData.id }).then(result => {
        return result;
    })
    console.log(adminData.id)
    return cartInfo;
}

// 2. Add quantity
module.exports.addQuantity = async (reqBody, adminData) => {
    let cartInfo = await Cart.findOne({ userId: adminData.id, productId: reqBody.productId }).then(result => {
        return result;
    })

    let updateAmount = {
        amount: cartInfo.amount + reqBody.amount,
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
// 3. Subtract Quantity
module.exports.subtractQuantity = async (reqBody, adminData) => {
    let cartInfo = await Cart.findOne({ userId: adminData.id, productId: reqBody.productId }).then(result => {
        return result;
    })

    if (cartInfo.amount < reqBody.amount) return 'Already zero';


    let updateAmount = {
        amount: cartInfo.amount - reqBody.amount,
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
// 4. Remove Item
module.exports.removeItem = async (reqBody, adminData) => {
    Cart.findOneAndRemove({ productId: reqBody.productId, userId: adminData.id }).then((product, error) => {
        if (error) {
            return false;
        }
        else {
            return 'Cart item removed';
        }
    })
}


// 5. Checkout
module.exports.checkOut = async (reqBody, adminData) => {
    let cartInfo = await Cart.find({ userId: adminData.id }, { _id: 0, productId: 1 }).then(result => {
        return result;
    })

    let orders = [];

    for (let i = 0; i < cartInfo.length; i++) {
        orders.push(cartInfo[i].productId)
    }

    let newOrder = new Order({
        // totalAmount: reqBody.totalAmount,
        userId: adminData.id,
        orderList: orders
    })

    return newOrder.save().then((user, error) => {
        if (error) {
            return false;
        }
        else {
            return true;
        }
    })
}   