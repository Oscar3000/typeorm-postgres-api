import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { omit } from "lodash";
import { Author } from "../entity/Author";

function AuthorResult(author: Author) {
    return omit(author, ["password"]);
}

class AuthorController {
    static getAll = async (req: Request, res: Response) => {
        //get authors from database
        const authorRepository = getRepository(Author);
        const authors = await authorRepository.find({relations: ["books"]});
        res.send(authors.map((author:Author) => AuthorResult(author)));
    }
    static getAuthorById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const authorRepository = getRepository(Author);
        let author: Author;

        try {
            author = await authorRepository.findOneOrFail(id);
          } catch (error) {
              res.status(404).send({ message: "Author not found", error });
              return;
          }
          res.status(200).send({ author: AuthorResult(author) });
    }
    static editAuthor = async (req: Request, res: Response) => {
        //get id from req params
        const id = req.params.id;

        //Get values from body
        const { firstname, lastname, age } = req.body;

        //Try to find the author in the database
        const authorRepository = getRepository(Author);
        let author: Author;
        try {
          author = await authorRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "Author not found", error });
            return;
        }

        author.firstName = firstname;
        author.lastName = lastname;
        if(!!age) author.age = age;

        //Validate if the parameters are okay
        const errors = await validate(author);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        //try to save the author
        try {
            await authorRepository.save(author);
        } catch (error) {
            res.status(409).send({ message: "an error occurred", error });
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ author: AuthorResult(author) });
    }

    static deleteAuthor = async (req: Request, res: Response) => {
        const id = req.params.id;

        const authorRepository = getRepository(Author);
        let author: Author;
        try {
            author = await authorRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "Author not found", error });
            return;
        }

        //delete the author
        await authorRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ author: AuthorResult(author), message: "Author has been deleted" });
    }
}

export default AuthorController;