import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

class UserController {
    static getAll = async (req: Request, res: Response) => {
        //get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.send(users);
    }
}

export default UserController;