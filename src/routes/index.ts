import { Router } from "express";
import user from "./user";
import auth from "./auth";
import book from "./book";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/book", book);

export default routes;