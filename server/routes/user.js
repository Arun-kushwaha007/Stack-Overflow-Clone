import express from "express"
import { login,signup } from "../controller/auth.js"

const router =express.router();

router.post("/signup",signup);
router.post("/login",login);






export default router
