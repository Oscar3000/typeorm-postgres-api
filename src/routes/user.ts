import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();


//get all users
router.get("/", UserController.getAll);

//get one user
router.get('/:id', UserController.getUserById);
//create a user
router.post("/", UserController.createUser);

//edit one user
router.patch("/:id", UserController.editUser);

//Delete one user
router.delete("/:id", UserController.deleteUser);

export default router;