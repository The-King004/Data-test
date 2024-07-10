import { Router } from "express";
import controllers from "../controllers/user.controllers";
import { Server } from "swagger-jsdoc";


const User = Router();

// User.get("/", controllers.getAllUsers);
// User.get("/:id", controllers.getOneUser);
User.post("/", controllers.createUser);
// User.put("/",);
User.delete("/all", controllers.deleteAllUsers)
// User.delete("/one/:id", controllers.deleteOneUser);


export default User;