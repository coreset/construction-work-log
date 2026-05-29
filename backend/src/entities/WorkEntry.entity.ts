import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Check,
} from "typeorm";

// Property names mirror DB column names (snake_case) so the JSON response
// keeps the existing API contract: `work_type`, `created_at`, `volume` as string.
@Entity({ name: "work_entries" })
@Check(`"volume" > 0`)
export class WorkEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  date!: string;

  @Column({ name: "work_type", type: "varchar", length: 255 })
  work_type!: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  volume!: string;

  @Column({ type: "varchar", length: 20 })
  unit!: string;

  @Column({ type: "varchar", length: 255 })
  performer!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at!: Date;
}
