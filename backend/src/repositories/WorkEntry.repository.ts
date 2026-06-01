import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  FindOptionsWhere,
} from "typeorm";
import { AppDataSource } from "../config/database.config";
import { WorkEntry } from "../entities/WorkEntry.entity";
import { WorkEntryFilters } from "../types/WorkEntry.type";

export class WorkEntryRepository {
  private get repo() {
    return AppDataSource.getRepository(WorkEntry);
  }

  async findAll(filters: WorkEntryFilters): Promise<WorkEntry[]> {
    const { from, to, sort } = filters;
    const order: "ASC" | "DESC" = sort === "asc" ? "ASC" : "DESC";

    const where: FindOptionsWhere<WorkEntry> = {};
    if (from && to) {
      where.date = Between(from, to);
    } else if (from) {
      where.date = MoreThanOrEqual(from);
    } else if (to) {
      where.date = LessThanOrEqual(to);
    }

    return this.repo.find({ where, order: { date: order, created_at: order } });
  }

  async findById(id: number): Promise<WorkEntry | null> {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<WorkEntry>): WorkEntry {
    return this.repo.create(data);
  }

  async save(entry: WorkEntry): Promise<WorkEntry> {
    return this.repo.save(entry);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete({ id });
    return !!result.affected;
  }
}
