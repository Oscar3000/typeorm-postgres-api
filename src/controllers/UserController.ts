import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { omit, uniq } from "lodash";

function UserResult(user: User) {
    return omit(user, ["password"]);
}

class UserController {
    static getAll = async (req: Request, res: Response) => {
        //get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        res.send(users.map((user:User) => omit(user, ["password"])));
    }
    static getUserById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
          } catch (error) {
              res.status(404).send({ message: "User not found", error });
              return;
          }
          res.status(200).send({ user: UserResult(user) });
    }
    static createUser = async (req: Request, res: Response) => {
        //get parameters from body
        let { firstname, lastname, username, password, age, roles } = req.body;
        if(!(username && password)){
            res.status(400).send({ error: "username and password must not be empty" });
            return
        }
        let user = new User();
        user.userName = username;
        user.firstName = firstname;
        user.lastName = lastname;
        user.password = password;
        user.age = age;

        if (!!roles) {
          const userRoles = roles.split(",").filter((role:string) => !!role);
          user.roles = userRoles.length ? ["viewer", ...userRoles] : ["viewer"];
        }

        //Validate if the parameters are okay
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store in DB
        user.hashPassword();

        //Try to save. If fails
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send({ message: "error occurred. try again later", error });
            return;
        }
        //If all ok, send 201 response
        res.status(201).send({ message: "User created" })
    }

    static editUser = async (req: Request, res: Response) => {
        //get id from req params
        const id = req.params.id;

        //Get values from body
        const { firstname, lastname, age, roles } = req.body;

        //Try to find the user in the database
        const userRepository = getRepository(User);
        let user: User;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "User not found", error });
            return;
        }

        user.firstName = firstname;
        user.lastName = lastname;
        user.age = age;

        if (!!roles) {
            const userRoles = roles.split(",").filter((role:string) => !!role);
            user.roles = uniq([...user.roles, ...userRoles]);
        }
        //Validate if the parameters are okay
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        //try to save the user
        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send({ message: "an error occurred", error });
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ user: UserResult(user) });
    }

    static deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "User not found", error });
            return;
        }

        //delete the user
        await userRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ user: UserResult(user), message: "user has been deleted" });
    }
}

export default UserController;