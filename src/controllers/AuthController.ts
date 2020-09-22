import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { omit } from "lodash";
import { validate } from "class-validator";

function UserResult(user: User) {
  return omit(user, ["password"]);
}

class AuthController {
  static login = async (req: Request, res: Response) => {
    //get parameters from the body.
    const { username, password } = req.body;
    if (!(username && password)) {
      res
        .status(400)
        .send({ error: "username and password must not be empty" });
      return;
    }
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { userName: username },
      });
    } catch (error) {
      res.status(401).send({
        error: "incorrect login",
      });
      return;
    }
    //check if encrypted password match
    if (!user.checkIfUnencryptedPasswordisValid(password)) {
      res.status(401).send({
        error: "try again. please check you username and password again",
      });
      return;
    }
    req.session!.userId = user.id;

    res.send({ user: UserResult(user) });
  };
  static changePassword = async (req: Request, res: Response) => {
    if (!req.session!.userId) {
      res.status(401).send({ error: "pls login and try again." });
      return;
    }
    //get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send({ error: "passwords must not be empty" });
      return;
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(req.session!.userId);
    } catch (error) {
      res.status(404).send({
        error: "user doesn't exist",
      });
      return;
    }
    //check if encrypted password match
    if (!user.checkIfUnencryptedPasswordisValid(oldPassword)) {
      res.status(401).send({
        error: "try again. please check your password again",
      });
      return;
    }

    user.password = newPassword;

    //Validate if the parameters are okay
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //hash new password
    user.hashPassword();

    //try and save the user.
    try {
      await userRepository.save(user);
    } catch (error) {
      res
        .status(409)
        .send({ message: "error occurred. try again later", error });
      return;
    }

    //If all ok, send 204 response
    res.status(204).send({ message: "password updated." })
  };
}

export default AuthController;
