import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length } from "class-validator";
import * as bcryptjs from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int"})
  age: number;

  @Column({ select: false })
  @Length(4, 20)
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
      this.password = bcryptjs.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordisValid(unencryptedPassword: string) {
      return bcryptjs.compareSync(unencryptedPassword, this.password);
  }
}