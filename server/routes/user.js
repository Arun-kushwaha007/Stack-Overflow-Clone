import express from "express"
// const express = require('express')
import { login,signup } from "../controller/auth.js"
import { getallusers,updatedprofile } from "../controller/user.js";
import auth from "../middleware/auth.js";
const router =express.Router();

router.post("/signup",signup);
router.post("/login",login);

router.get("/getalluser",getallusers)

router.patch("/update/:id",auth,updatedprofile)




export default router
