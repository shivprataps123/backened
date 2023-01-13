const jwt=require("jsonwebtoken");
require("dotenv").config();
const key=process.env.secret_key
const authenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,key)
        if(decoded){
            const userID=decoded.userID;
            console.log(decoded);
            req.body.userID=userID
            next();
        }else{
            res.send({message:"Please Login First"})
        }
    }else{
        res.send({message:"Please Login First"})
    }
}
module.exports={authenticate}