import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();


//get all users
router.get("/", UserController.getAll);

export default router;