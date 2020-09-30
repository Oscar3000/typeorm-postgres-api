import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.session!.userId;

    //get User from the database
    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(401).send();
      return;
    }
    //check if the array of authorized roles includes the user's role
    if (user!.roles.some((role) => roles.indexOf(role) > -1)) next();
    else {
      res.status(401).send();
      return;
    }
  };
};
