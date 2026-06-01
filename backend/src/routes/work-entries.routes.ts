import { Router } from "express";
import { WorkEntryController } from "../controllers/WorkEntry.controller";
import { WorkEntryService } from "../services/WorkEntry.service";
import { WorkEntryRepository } from "../repositories/WorkEntry.repository";

const router = Router();
const controller = new WorkEntryController(
  new WorkEntryService(new WorkEntryRepository())
);

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
