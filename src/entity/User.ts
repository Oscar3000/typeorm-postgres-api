import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToOne, JoinColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import * as bcryptjs from "bcryptjs";
import { Author } from "./Author";


// enum Role {
//   Viewer = "viewer",
//   Admin = "admin",
//   Author = "author"
// }

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true })
  @IsNotEmpty()
  userName: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" })
  age: number;

  @Column()
  password: string;

  @Column("text", {
    array: true,
    default: '{"viewer"}',
  })
  roles: string[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(type => Author, { nullable: true, cascade: true})
  @JoinColumn()
  author: Author;

  hashPassword() {
    this.password = bcryptjs.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordisValid(unencryptedPassword: string) {
    return bcryptjs.compareSync(unencryptedPassword, this.password);
  }
}
