const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "User already registered",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });
    //  existingUser.Cart=null;
    // Create JWT token
    const payload = {
      userId: newUser._id,
      email: newUser.email,
      // cart:existingUser.Cart
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    // console.log(token);
    // Respond with the token
    res.status(200).json({
      success: true,
      message: "User created successfully",
      token: token,
      name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};


exports.getSignin = async (req, res) => {
  try {

      // Extract token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({
              success: false,
              message: "No token provided or token format is incorrect"
          });
      }

      const token = authHeader.split(' ')[1];
      // Verify the token (assuming JWT)
      let decoded;
      try {
          decoded = jwt.verify(token,process.env.JWT_SECRET); // Replace 'your_jwt_secret' with your actual secret
      } catch (err) {
          return res.status(401).json({
              success: false,
              message: "Invalid token"
          });
      }
      const {email}=decoded;
      // console.log(email);
      // Find the user with the specified email
      const user = await User.findOne({ email });

      // If user doesn't exist, return a 404 response
      if (!user) {
          return res.status(404).json({
              success: false,
              message: "User not found"
          });
      }

      // If user exists, return the user's name
      res.status(200).json({
          success: true,
          username: user.name // As suming user object has a name property
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          error: error.message,
          message: "Internal server error"
      });
  }
};

