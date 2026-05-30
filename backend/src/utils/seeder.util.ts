import { AppDataSource } from "../config/database.config";
import { WorkType } from "../entities/WorkType.entity";

const DEFAULT_WORK_TYPES = [
  "Partition masonry",
  "Formwork installation",
  "Concrete pouring",
  "Rebar tying",
  "Plastering of walls",
  "Floor screed",
  "Waterproofing",
  "Insulation works",
  "Roofing",
  "Demolition works",
];

export async function seedWorkTypes(): Promise<void> {
  const repo = AppDataSource.getRepository(WorkType);
  const count = await repo.count();
  if (count === 0) {
    await repo.insert(DEFAULT_WORK_TYPES.map((name) => ({ name })));
  }
}
