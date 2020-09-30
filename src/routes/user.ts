import { Router } from "express";
import UserController from "../controllers/UserController";
import { session } from "../middlewares/sessionMiddleware";

const router = Router();


//get all users
router.get("/", UserController.getAll);

//get one user
router.get('/:id', UserController.getUserById);
//create a user
router.post("/", UserController.createUser);

//edit one user
router.patch("/:id", [session], UserController.editUser);

//Delete one user
router.delete("/:id", [session], UserController.deleteUser);

export default router;