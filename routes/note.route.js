const express=require("express");
const noteRouter=express.Router();
const {NoteModel}=require("../models/note.model");
noteRouter.get("/",async(req,res)=>{
    try{
      let note=await NoteModel.find()
      res.send(note)
      console.log('get request');
    }catch(err){
        res.send({message:"something went wrong"})
    }
}) 

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try{
       const note=new NoteModel(payload)
       await note.save();
       console.log(note);
       res.send("created the note")
    }catch(err){
        console.log(err);
        res.send({message:"something went wrong"})
    }
  
})


noteRouter.patch("/update/:id",async(req,res)=>{
    let ID=req.params.id
    let payload=req.body
    const note=await NoteModel.findOne({_id:ID})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({message:"You are not authorised"})
        }else{
      await NoteModel.findByIdAndUpdate({_id:ID},payload);
      res.send("updated the note")
        }
    }catch(err){
        console.log(err);
      res.send({message:"something went wrong"})
    }


})


noteRouter.delete("/delete/:id",async(req,res)=>{
    let ID=req.params.id
   
    const note=await NoteModel.findOne({_id:ID})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID
    try{
        if(userID_making_req!==userID_in_note){
            res.send({message:"You are not authorised"})
        }else{
      await NoteModel.findByIdAndDelete({_id:ID});
      res.send("delete the note")
        }
    }catch(err){
        console.log(err);
      res.send({message:"something went wrong"})
    }


})

module.exports={noteRouter};