import express from "express";
const userRouter =  express.Router();
import UserController from "../controllers/UserController.js";
import authenticateUser from "../middlewares/authenticateUser.js";

//public routes

userRouter.post("/login", UserController.userLogin);
userRouter.post("/register", UserController.userRegister);

//private routes
userRouter.get("/", authenticateUser, UserController.userInfo);

export default userRouter;