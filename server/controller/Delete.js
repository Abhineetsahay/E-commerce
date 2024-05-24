const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Delete = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided or token format is incorrect",
      });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);
    // Verify the token (assuming JWT)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_jwt_secret' with your actual secret
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const {email}=decoded;
    const result=await User.findOneAndDelete({email});
    return res.status(200).json({
          success:true,
          message:"User deleted Sucessfully"
    })
  } catch (error) {
          return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
          })
  }
};
