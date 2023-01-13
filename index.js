const express=require("express");
const cors=require("cors");
const app=express();
const {connection}=require("./configs/db");
const {userRouter}=require("./routes/user.route");
const {noteRouter}=require("./routes/note.route")
const {authenticate}=require("./middlewares/authenticate.middleware")
require("dotenv").config();
const port=process.env.port
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(port,async()=>{
    try{
   await connection;
   console.log('connected to database');
    }catch(err){
        console.log('error in connecting with database');
    }
    console.log(`server is running on http://localhost:${port}`);
})