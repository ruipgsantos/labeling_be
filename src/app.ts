import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { NextFunction } from "connect";
import "express-async-errors";
import { AuthRouter, CaseRouter, ConditionRouter } from "./controllers";
import { loadCases, loadConditions } from "./utils";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import Repository from "./repositories/Repository";

require("dotenv").config();

const app = express();

//TODO: cors options
app.use(
  cors({
    origin: /^(http|https):\/\/localhost:\d{4}/,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    genid: function () {
      return uuidv4();
    },
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1,
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/auth", AuthRouter);
app.use("/case", CaseRouter);
app.use("/condition", ConditionRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

loadConditions();
loadCases();

process.on("SIGINT", async () => {
  await Repository.closeConnections();
  console.log("Mongoose disconnected on app termination");
  process.exit(0);
});

export default app;
