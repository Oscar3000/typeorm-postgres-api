import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { omit } from "lodash";
import { Book } from "../entity/Book";
import { User } from "../entity/User";
import { Author } from "../entity/Author";

function BookResult(book: Book) {
    return omit(book, ["password"]);
}

class UserController {
    static getAll = async (req: Request, res: Response) => {
        //get books from database
        const bookRepository = getRepository(Book);
        const books = await bookRepository.find({relations: ["author"]});
        res.send(books.map((book:Book) => BookResult(book)));
    }
    static getBookById = async (req: Request, res: Response) => {
        const id = req.params.id;
        const bookRepository = getRepository(Book);
        let book: Book;

        try {
            book = await bookRepository.findOneOrFail(id);
          } catch (error) {
              res.status(404).send({ message: "Book not found", error });
              return;
          }
          res.status(200).send({ book: BookResult(book) });
    }
    static createBook = async (req: Request, res: Response) => {
        //get parameters from body
        let { title, isbn } = req.body;
        if(!(title && isbn)){
            res.status(400).send({ error: "title and isbn must not be empty" });
            return
        }
        let book = new Book();
        book.title = title;
        book.isbn = isbn;

        //Validate if the parameters are okay
        const errors = await validate(book);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        //create or find the Author of the book
        let author: Author;
        try {
           const userRepository = getRepository(User);
           const user = await userRepository.findOneOrFail(req.session!.userId,{ relations: ["author"]});
           if(user.author){
               author = user.author;
           } else {
             author = new Author();
             author.firstName = user.firstName;
             author.lastName = user.lastName;
             author.age = user.age;
             user.author = author;

             //Validate if the user parameters are okay
             const errors = await validate(user);
             if (errors.length > 0) {
               res.status(400).send(errors);
               return;
             }
             await userRepository.save(user);
           }
        } catch (error) {
            res.status(404).send({ message: "User not found", error });
            return;
        }

        //Try to save. else fail
        const bookRepository = getRepository(Book);
        try {
            book.author = author;
            await bookRepository.save(book);
        } catch (error) {
            res.status(409).send({ message: "error occurred. try again later", error });
            return;
        }
        //If all ok, send 201 response
        res.status(201).send({ message: "Book created" })
    }

    static editBook = async (req: Request, res: Response) => {
        //get id from req params
        const id = req.params.id;

        //Get values from body
        const { title, isbn } = req.body;

        //Try to find the book in the database
        const bookRepository = getRepository(Book);
        let book: Book;
        try {
          book = await bookRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "Book not found", error });
            return;
        }

        book.title = title;
        book.isbn = isbn;

        //Validate if the parameters are okay
        const errors = await validate(book);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }

        //try to save the book
        try {
            await bookRepository.save(book);
        } catch (error) {
            res.status(409).send({ message: "an error occurred", error });
            return;
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ book: BookResult(book) });
    }

    static deleteBook = async (req: Request, res: Response) => {
        const id = req.params.id;

        const bookRepository = getRepository(Book);
        let book: Book;
        try {
            book = await bookRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ message: "Book not found", error });
            return;
        }

        //delete the book
        await bookRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(204).send({ book: BookResult(book), message: "user has been deleted" });
    }
}

export default UserController;