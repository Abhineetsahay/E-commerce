const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login=async(req,res)=>{
          try {
          const {email,password}=req.body;
          if (!email||!password){
                    return res.status(400).json({
                              success:false,
                              message:"Enter all deatails carefully"
                    })
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(email);
          if(!isValidEmail){
                  return res.status(401).json({
                    sucess:false,
                    message:"Enter a valid E-mail"
                  })
          }
          const existingUser=await User.findOne({email});
          if (!existingUser) {
                    return res.status(401).json({
                              success:false,
                              message:"user is not registered"
                    })
          }
          const payload={
                    email:existingUser.email,
                    userId:existingUser._id,
                    cart:existingUser.Cart
          }
          if(await bcrypt.compare(password,existingUser.password)){
                    let token=jwt.sign(payload,process.env.JWT_SECRET,{
                              expiresIn:"2h"
                    });
                    res.status(200).json({
                              success:true,
                              token,
                              message:"login successfully"
                    })
          }
          else{
                    return res.status(403).json({
                              success:false,
                              message:"password is incorrect"
                    })
          }


          } catch (error) {
                    return res.status(500).json({
                              success:false,
                              message:'Login Failure',
                          });
          }
}