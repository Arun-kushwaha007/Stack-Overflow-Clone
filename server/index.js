import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import dotenv from "dotenv";

const app=express();
dotenv.config();
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}));

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Codequest is running perfect")
})

const PORT=process.env.PORT || 5000;
const database_url =process.env.MONGODB_URL;

mongoose.connect(database_url)
.then(()=> app.listen(PORT, ()=>(console.log(  `server running on port ${PORT} `))))
.catch((err)=> console.log(err.message));
