import { Router } from "express";
import { session } from "../middlewares/sessionMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";
import BookController from "../controllers/BookController";

const router = Router();


//get all users
router.get("/", BookController.getAll);

//get one user
router.get('/:id', BookController.getBookById);
//create a user
router.post("/",[session, checkRole(["admin", "author"])], BookController.createBook);

//edit one user
router.patch("/:id", [session, checkRole(["admin", "author"])], BookController.editBook);

//Delete one user
router.delete("/:id", [session, checkRole(["admin", "author"])], BookController.deleteBook);

export default router;