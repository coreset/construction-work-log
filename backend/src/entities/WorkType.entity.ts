import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "work_types" })
export class WorkType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;
}
