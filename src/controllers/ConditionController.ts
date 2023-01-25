import express, { Request, Response } from "express";
import { Condition } from "../models";
import ConditionRepository from "../repositories/ConditionRepository";

const router = express.Router();
const conditionRepo = ConditionRepository.getInstance();

router.get("/", async (req: Request, res: Response<Condition[]>) => {
  res.json(await conditionRepo.getAllConditions());
});

export default router;
