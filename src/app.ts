import express from "express";
import { connectToDatabase } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import indexRoutes from "./routes/index.js";

export const createApp = async () => {
  const app = express();
  app.use(express.json());

  await connectToDatabase();

  app.use("/api", indexRoutes);

  app.use(errorHandler);
  return app;
};
