import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  import { Book } from "./Book";
  
  @Entity()
  export class Author {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "text" })
    @IsNotEmpty()
    firstName: string;
  
    @Column({ type: "text" })
    @IsNotEmpty()
    lastName: string;
  
    @Column({ type: "int", nullable: true })
    age: number;

    @OneToMany(type => Book, book => book.author)
    books: Book[]
  
  }
  