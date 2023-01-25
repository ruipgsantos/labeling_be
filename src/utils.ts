import ConditionRepository from "./repositories/ConditionRepository";
import csv from "csvtojson";
import * as fs from "fs/promises";
import { Condition } from "./models";
import path from "path";

const loadConditions = async () => {
  const conditionsRepo = ConditionRepository.getInstance();

  //TODO: replace with count
  const existingConditions = await conditionsRepo.getAllConditions();

  try {
    if (existingConditions.length === 0) {
      console.info("No conditions loaded, reading file...");
      //load conditions from csv

      const fileString = (
        await fs.readFile(path.join(__dirname, "conditions.csv"))
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

export { loadConditions };
