import ConditionRepository from "./repositories/ConditionRepository";
import csv from "csvtojson";
import * as fs from "fs";
import { Condition } from "./models";
import path from "path";
import CaseRepository from "./repositories/CaseRepository";

const loadConditions = async () => {
  const conditionsRepo = ConditionRepository.getInstance();

  //TODO: replace with count
  const existingConditions = await conditionsRepo.getAllConditions();

  try {
    if (!existingConditions || existingConditions.length === 0) {
      console.info("No conditions loaded, reading file...");

      //load conditions from csv
      const fileString = (
        await fs.readFileSync(path.join(__dirname, "../conditions.csv"))
      ).toString();

      let conditionsJson = (await csv({
        delimiter: "\t",
        headers: ["icd10", "description"],
      }).fromString(fileString)) as Condition[];

      conditionsRepo.insertConditions(conditionsJson);

      console.info("Conditions Loaded");
    }
  } catch (e) {
    console.error("Could not load conditions.");
    console.error(e);
  }
};

const getCaseFilesText = (fileDir: string): string[] => {
  const dirfiles = fs.readdirSync(fileDir);

  return dirfiles
    .filter(async (file: string) => {
      return fs.lstatSync(path.join(fileDir, file)).isFile();
    })
    .map((file): string => {
      return fs.readFileSync(path.join(fileDir, file)).toString();
    });
};

const loadCases = async () => {
  try {
    console.info("Loading Cases...");
    const caseRepo = CaseRepository.getInstance();
    await caseRepo.clearCollection();

    //get case files from "cases" dir
    const caseFilesText = getCaseFilesText("cases");

    await caseRepo.insertCases(
      caseFilesText.map((text) => {
        return {
          text,
          labelled: false,
        };
      })
    );

    console.info("Cases loaded.");
  } catch (e) {
    console.info("Could not load cases");
    console.log(e);
  }
};

export { loadConditions, loadCases };
