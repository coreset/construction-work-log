import { Request, Response } from "express";
import { WorkEntryService } from "../services/WorkEntry.service";
import {
  CreateWorkEntrySchema,
  UpdateWorkEntrySchema,
} from "../validators/WorkEntry.validation";
import { WorkEntryFilters } from "../types/WorkEntry.type";

export class WorkEntryController {
  constructor(private readonly service: WorkEntryService) {}

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: WorkEntryFilters = {
        from: req.query.from as string | undefined,
        to: req.query.to as string | undefined,
        sort: req.query.sort as "asc" | "desc" | undefined,
      };
      const entries = await this.service.getAll(filters);
      res.json(entries);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch work entries" });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = CreateWorkEntrySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors[0].message });
        return;
      }
      const entry = await this.service.create(parsed.data);
      res.status(201).json(entry);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create work entry" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = UpdateWorkEntrySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: parsed.error.errors[0].message });
        return;
      }
      const entry = await this.service.update(Number(req.params.id), parsed.data);
      res.json(entry);
    } catch (err) {
      if (err instanceof Error && err.message === "NOT_FOUND") {
        res.status(404).json({ error: "Entry not found" });
        return;
      }
      console.error(err);
      res.status(500).json({ error: "Failed to update work entry" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.delete(Number(req.params.id));
      res.json({ message: "Entry deleted", id: Number(req.params.id) });
    } catch (err) {
      if (err instanceof Error && err.message === "NOT_FOUND") {
        res.status(404).json({ error: "Entry not found" });
        return;
      }
      console.error(err);
      res.status(500).json({ error: "Failed to delete work entry" });
    }
  };
}
