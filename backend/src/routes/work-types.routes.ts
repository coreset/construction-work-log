import { Router } from "express";
import { WorkTypeController } from "../controllers/WorkType.controller";
import { WorkTypeService } from "../services/WorkType.service";
import { WorkTypeRepository } from "../repositories/WorkType.repository";

const router = Router();
const controller = new WorkTypeController(
  new WorkTypeService(new WorkTypeRepository())
);

router.get("/", controller.getAll);

export default router;
