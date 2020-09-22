import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

//log user in.
router.post("/login", AuthController.login);

// change user password
router.post("/changePassword", AuthController.changePassword);


export default router;