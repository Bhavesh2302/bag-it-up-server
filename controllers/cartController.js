const { Router } = require("express");
const { authentication } = require("../middlewares/authentication");
const { Cart } = require("../models/cartModel");
const { Bag } = require("../models/bagModel");

const cartController = Router();

cartController.get("/get", authentication, async (req, res) => {
  const { userId } = req.body;
  const cart_data = await Cart.find({ userId });

  res.send({ cartData: cart_data });
});

cartController.post("/add/:bagId", authentication, async (req, res) => {
  const { userId } = req.body;
  const { bagId } = req.params;
  const isExist = await Cart.findOne({ bagId: bagId, userId: userId });
  if (!isExist) {
    const bag = await Bag.findOne({ _id: bagId });
    const payload = {
      price: bag.discounted_price,
      qty: 1,
      title: bag.title,
      image_url: bag.image_url_1,
      brand: bag.brand,
      category: bag.category,
      userId: userId,
      bagId: bagId,
    };
    const cartData = new Cart(payload);
    await cartData.save();
    res.send({ msg: "Item has Been added to cart", cartData: cartData });
  } else {
    res.send({ msg: "Item is alreeady present in the cart" });
  }
});

cartController.delete("/delete/:cartId", authentication, async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;
  const deletedItem = await Cart.deleteOne({ _id: cartId, userId });
  res.send({ msg: "Item has been deleted" });
});

cartController.patch("/:cartId", authentication, async (req, res) => {
  const { userId,qty } = req.body
  const { cartId } = req.params;
if (qty && typeof qty !== 'number') {
  return res.status(400).send({ msg: 'Quantity (qty) must be a valid number' });
}
else{
  const updatedCart = await Cart.findByIdAndUpdate(
    { _id: cartId, userId },
    { $inc: { qty: Number(qty) } }
  );
  res.send({
    msg: "qty has been updated",
    qty: updatedCart,
    payload: qty,
  });
}
});

module.exports = {
  cartController,
};
