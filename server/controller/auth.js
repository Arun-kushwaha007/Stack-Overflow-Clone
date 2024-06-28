import user from '../models/auth.js';
import bcrypt from "bcryptjs"
export const signup = async(req,res)=>{
    const {name, email, password} = req.body;
    try{
        const extinguser = await user.findOne({email});
        if(extinguser){
            return res.status(404).json({message:"User already exist"});
        }
        const hashedpassword = await bcrypt.hash(password,12);
        const newuser = await users.create({
            name,
            email,
            password:  hashedpassword
        });
        res.status(200).json({result: newuser});
    } catch (error){
        res.status(500).json( "Something went wrong");
    }
};

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const extinguser = await users.findOne({email});
        if(!extinguser){
            return res.status(404).json({message:"User not found"});
        }
        const ispasswordcrct = await bcrypt.compare(password,extinguser.password);
        if(!ispasswordcrct){
            res.status(400).json({message:"Invalid credentials"});

        }
        res.status(200).json({result:extinguser})
    }catch(error){
        res.status(500).json("something went wrong...")
    }
}