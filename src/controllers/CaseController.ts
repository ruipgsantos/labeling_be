import express, { Request, Response } from "express";
import CaseRepository from "../repositories/CaseRepository";
import { Case } from "../models";

const router = express.Router();
const caseRepo = CaseRepository.getInstance();

router.get("/", async (req: Request, res: Response<Case[]>) => {
  res.json(await caseRepo.getAllCases());
});

//NOTE: Body could be the same type as Case model (including entire label as Condition)
// would be more direct to save to document, but then any random label could be sent
router.put(
  "/",
  async (
    req: Request<{}, {}, { caseId: string; labelId: string }>,
    res: Response
  ) => {
    const result = await caseRepo.setCaseLabelled({
      ...req.body,
      doctorId: req.session.userId,
    });

    res.status(result.modifiedCount > 0 ? 200 : 500).send();
  }
);

export default router;
