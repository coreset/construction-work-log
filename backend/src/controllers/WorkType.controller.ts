import { Request, Response } from "express";
import { WorkTypeService } from "../services/WorkType.service";

export class WorkTypeController {
  constructor(private readonly service: WorkTypeService) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const types = await this.service.getAll();
      res.json(types);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch work types" });
    }
  };
}
