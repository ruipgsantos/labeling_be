import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { NextFunction } from "connect";
import "express-async-errors";
import {
  AuthController,
  CaseController,
  ConditionController,
} from "./controllers";
import { loadCases, loadConditions } from "./utils";
import session from "express-session";
import cookieParser from "cookie-parser";
import Repository from "./repositories/Repository";

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

//Custom session to know which doctor has labelled
declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/auth", AuthController);
app.use("/case", CaseController);
app.use("/condition", ConditionController);

//NOTE: Error handling: should have custom Errors which would be filtered by this middleware and assigned the right STATUS
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

loadConditions();
loadCases();

//NOTE: is this needed??
process.on("SIGINT", async () => {
  await Repository.closeConnections();
  process.exit(0);
});

export default app;
