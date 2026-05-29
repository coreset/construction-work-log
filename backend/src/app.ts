import express from "express";
import cors from "cors";
import workEntriesRouter from "./routes/work-entries.routes";
import workTypesRouter from "./routes/work-types.routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

app.use("/api/work-entries", workEntriesRouter);
app.use("/api/work-types", workTypesRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandlerMiddleware);

export default app;
