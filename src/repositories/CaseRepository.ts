import { Case } from "../models";
import Repository from "./Repository";
import { ObjectId, InsertOneResult, InsertManyResult } from "mongodb";
import ConditionRepository from "./ConditionRepository";

export default class CaseRepository extends Repository {
  protected static readonly CASE_COLLECTION = "case";
  private static instance: CaseRepository;

  private constructor() {
    super(CaseRepository.CASE_COLLECTION);
  }

  public static getInstance(): CaseRepository {
    if (!CaseRepository.instance) {
      CaseRepository.instance = new CaseRepository();
    }

    return CaseRepository.instance;
  }

  public async getCaseById(caseObj: Partial<Case>): Promise<Case> {
    return await this.execute(async () => {
      return await this.queryCollection().findOne({ id: caseObj._id });
    });
  }

  public async getAllCases(): Promise<Case[]> {
    return await this.execute(async () => {
      return await this.queryCollection().find({ labelled: false }).toArray();
    });
  }

  public async insertCase(
    caseObj: Partial<Case>
  ): Promise<InsertOneResult<Case>> {
    return await this.execute(async () => {
      return await this.queryCollection().insertOne(caseObj);
    });
  }

  public async insertCases(
    caseObjs: Partial<Case>[]
  ): Promise<InsertManyResult<Case>> {
    return await this.execute(async () => {
      return await this.queryCollection().insertMany(caseObjs);
    });
  }

  public async setCaseLabelled({
    caseId,
    labelId,
    doctorId,
  }: {
    caseId: string;
    labelId: string;
    doctorId: string;
  }): Promise<Case> {
    const condition = await ConditionRepository.getInstance().getCondition(
      labelId
    );

    return await this.execute(async () => {
      return await this.queryCollection().updateOne(
        { _id: new ObjectId(caseId) },
        {
          $set: {
            labelled: true,
            label: condition,
            doctorId,
            time: Date.now(),
          },
        }
      );
    });
  }
}
