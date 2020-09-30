import { Router } from "express";
import user from "./user";
import auth from "./auth";
import book from "./book";
import author from "./author";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/book", book);
routes.use("/author", author);

export default routes;