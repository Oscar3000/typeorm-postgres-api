import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
import { Author } from "./Author";
  
  @Entity()
  export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "text" })
    @IsNotEmpty()
    title: string;
  
    @Column({ type: "int", unique: true })
    isbn: number;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(type => Author, author => author.books)
    author: Author;
  }
  