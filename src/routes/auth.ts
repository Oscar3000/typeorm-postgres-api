import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

//get all users
router.post("/login", AuthController.login);


export default router;