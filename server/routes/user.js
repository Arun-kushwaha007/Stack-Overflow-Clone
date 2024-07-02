<<<<<<< HEAD
import express from "express"
// const express = require('express')
import { login,signup } from "../controller/auth.js"
import { getallusers,updatedprofile } from "../controller/users.js";
import auth from "../middleware/auth.js";
const router =express.Router();

router.post("/signup",signup);
router.post("/login",login);

router.get("/getallusers",getallusers)

router.patch("/update/:id",auth,updatedprofile)




export default router
=======
>>>>>>> parent of 7cbe3ca (server auth)
