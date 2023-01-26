import express, { Request, Response } from "express";
import CaseRepository from "../repositories/CaseRepository";
import { Case } from "../models";

const router = express.Router();
const caseRepo = CaseRepository.getInstance();

router.get("/", async (req: Request, res: Response<Case[]>) => {
  res.json(await caseRepo.getAllCases());
});

router.put(
  "/",
  async (
    req: Request<{}, {}, { _id: string; label: string }>,
    res: Response<Case>
  ) => {
    res.json(await caseRepo.setCaseLabelled(req.body));
  }
);

export default router;
