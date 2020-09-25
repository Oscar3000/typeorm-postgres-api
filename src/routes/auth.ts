import { Router } from "express";
import { session } from "../middlewares/sessionMiddleware";
import AuthController from "../controllers/AuthController";

const router = Router();

//log user in.
router.post("/login", AuthController.login);

//log user out
router.post("/logout", [session], AuthController.logout);

// change user password
router.post("/changePassword", [session], AuthController.changePassword);


export default router;