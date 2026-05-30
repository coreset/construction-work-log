import { WorkTypeRepository } from "../repositories/WorkType.repository";
import { WorkType } from "../entities/WorkType.entity";

export class WorkTypeService {
  constructor(private readonly repo: WorkTypeRepository) {}

  async getAll(): Promise<WorkType[]> {
    return this.repo.findAll();
  }
}
