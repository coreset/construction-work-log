import { AppDataSource } from "../config/database.config";
import { WorkType } from "../entities/WorkType.entity";

export class WorkTypeRepository {
  private get repo() {
    return AppDataSource.getRepository(WorkType);
  }

  async findAll(): Promise<WorkType[]> {
    return this.repo.find({ order: { name: "ASC" } });
  }
}
