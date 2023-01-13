const express=require("express");
const userRouter=express.Router();
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config();
const key=process.env.secret_key
const {UserModel}=require("../models/User.model")
userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body
    try{
        bcrypt.hash(pass,5,async(err,secure_password) =>{
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({email,pass:secure_password,name,age})
                await user.save()
                res.send("Registered")
            }
        });
        
    }catch(err){
        res.send({message:"something went wrong"})
        console.log(err);
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.find({email});
        
        //const user=await UserModel.find({email,pass});
        
        //console.log(token);
        const hashed_pass=user[0].pass;
        if(user.length>0){//if user is there in database
            bcrypt.compare(pass,hashed_pass,(err, result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},key);
                    res.send({"message":"login succesfull","token":token})
                }else{
                    console.log(err);
                    res.send("wrong credentials")
                }
            })

        }else{
            res.send("wrong credentials")
        }
       
        
    }catch(err){
        res.send({message:"something went wrong"});
        console.log(err);
    }
    
})
module.exports={userRouter}