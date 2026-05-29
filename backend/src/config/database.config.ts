import "reflect-metadata";
import { DataSource } from "typeorm";
import { WorkType } from "../entities/WorkType.entity";
import { WorkEntry } from "../entities/WorkEntry.entity";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: connectionString,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  // auto-creates/updates tables from entities — turn off in prod and use migrations
  synchronize: process.env.DB_SYNCHRONIZE !== "false",
  logging: false,
  entities: [WorkType, WorkEntry],
  migrations: [],
});
