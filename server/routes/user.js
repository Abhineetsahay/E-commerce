const express = require("express");
const { Signin, getSignin } = require("../controller/User");
const { addCartItem, getCartdata, deleteCartdata } = require("../controller/Cart");
const { fetchdata } = require("../controller/Getdata");
const { Delete } = require("../controller/Delete");
const { login } = require("../controller/Login");
const { authenticateToken } = require("../middleware/Jwtauthenticate");

const router = express.Router();

router.get("/fetchdata", fetchdata);

router.post("/Signin", Signin);
router.post("/login", login);

router.get("/getSignin", getSignin);
router.delete("/deleteuser", Delete);

router.post('/addcartdata', authenticateToken, addCartItem);
router.get('/getcartdata', authenticateToken, getCartdata);
router.delete('/deletecartdata/:id', authenticateToken, deleteCartdata);

module.exports = router;
