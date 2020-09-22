import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { omit } from "lodash";

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
      user = await userRepository.findOneOrFail({ where: { username } });
      user;
    } catch (error) {
      res.status(401).send({
        error: "try again. please check you username and password again",
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
    //get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res
        .status(400)
        .send({ error: "username and password must not be empty" });
      return;
    }
  };
}

export default AuthController;
