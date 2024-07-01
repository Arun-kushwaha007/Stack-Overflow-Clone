import mongoose from "mongoose";
import users from "../models/auth.js"


export const getallusers = async(req,res)=>{
    try{
        const allusers = await users.find()
        const alluserdetails = [];
        allusers.forEach((user)=>{
            alluserdetails.push({
                id: user._id,
                name: user.name,
                tags: user.tags,
                joinedon: user.joinedon,
            });
        })
        res.status(200).json(alluserdetails);
    }catch(error){
        res.status(404).json({message: error.message});
        return
    }
}

export const updatedprofile = async(req,res)=>{
    const {id: _id} = req.params;
    const {name, about, tags} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No user with that id");
    }
    try{
        const updatedprofile = await users.findByIdAndUpdate(_id, {$set:{name:name, about:about, tags: tags}},
            {new:true}

        );
        res.status(200).json(updatedprofile)
    }catch(error){
        res.status(400).json({message: error.message});
        return
    }
}