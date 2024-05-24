const Data=require("../models/data");

exports.fetchdata=async(req,res)=>{
          try {
                    const data=await Data.find({});
                    res.status(200).json({ message: "hgjk" ,
                              result:data
                    });
          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
}