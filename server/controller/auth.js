import user from '../models/auth.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async(req,res)=>{
    const {name, email, password} = req.body;
    try{
        const extinguser = await user.findOne({email});
        if(extinguser){
            return res.status(404).json({message:"User already exist"});
        }
        const hashedpassword = await bcrypt.hash(password,12);
        const newuser = await user.create({
            name,
            email,
            password:  hashedpassword
        });
        const token = jwt.sign({
            email: newuser.email, 
            id: newuser._id
        }, process.env.JWT_SECRET, {expiresIn:"1h"})

        res.status(200).json({result: newuser, token});
    } catch (error){
        res.status(500).json( "Something went wrong");
        return
    }
<<<<<<< HEAD
};

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const extinguser = await user.findOne({email});
        if(!extinguser){
            return res.status(404).json({message:"User not found"});
        }
        const ispasswordcrct = await bcrypt.compare(password,extinguser.password);
        if(!ispasswordcrct){
            res.status(400).json({message:"Invalid credentials"});
            return

        }
        const token = jwt.sign({
            email: extinguser.email, 
            id: extinguser._id
        }, process.env.JWT_SECRET, {expiresIn:"1h"})
        
        res.status(200).json({result:extinguser, token})
    }catch(error){
        res.status(500).json("something went wrong...")
        return
    }
=======
>>>>>>> parent of 7cbe3ca (server auth)
}