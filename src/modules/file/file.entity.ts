import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
}