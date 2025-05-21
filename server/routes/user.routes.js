import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router()

router.post("/", registerUser);
router.post("/login" , loginUser)
router.post("/logout", verifyJWT, logoutUser);


export default router