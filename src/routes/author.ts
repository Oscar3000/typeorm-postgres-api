import { Router } from "express";
import { session } from "../middlewares/sessionMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";
import AuthorController from "../controllers/AuthorController";

const router = Router();


//get all users
router.get("/", AuthorController.getAll);

//get one user
router.get('/:id', [session],AuthorController.getAuthorById);

//edit one user
router.patch("/:id", [session, checkRole(["admin", "author"])], AuthorController.editAuthor);

//Delete one user
router.delete("/:id", [session, checkRole(["admin", "author"])], AuthorController.deleteAuthor);

export default router;