import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { NextFunction } from "connect";
import "express-async-errors";
import { AuthRouter, CaseRouter } from "./routes";

require("dotenv").config();

const app = express();

//TODO: cors options
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/auth", AuthRouter);
app.use("/cases", CaseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

export default app;
