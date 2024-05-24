const Cart = require("../models/cart");
const User = require("../models/usermodel");

exports.addCartItem = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from JWT token by middleware
    const { description, id, price, title} = req.body;

    // Validate request data
    if (!description || !id || !price || !title ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create and save cart item
    const cartItem = await Cart.create({
      description,
      id,
      price,
      title,
    });

    // Update user's cart
    user.Cart.push(cartItem._id);
    const updatedUser = await user.save();

    // Populate the Cart field in the updated user
    const populatedUser = await User.findById(userId).populate("Cart").exec();

    res.status(200).json({
      success: true,
      message: "Cart item added successfully",
      cartItem,
      user: populatedUser, // Return the populated user with cart items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cart data did not get inserted",
      error: error.message,
    });
  }
};
exports.getCartdata = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from JWT token by middleware
    // console.log(userId); 
    const user = await User.findById(userId).populate('Cart');
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      cart: user.Cart,
    });
    // console.log(user.Cart);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting data",
      error: error.message,
    });
  }
};

exports.deleteCartdata = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from JWT token by middleware
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing Cart ID",
      });
    }

    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return res.status(404).json({
        success: false,
        message: "No cart data found with the provided ID",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { Cart: deletedCart._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true,
      message: "Cart data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting cart data",
      error: error.message,
    });
  }
};
