import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import indexRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRoutes);

app.use(errorHandler);

export default app;
