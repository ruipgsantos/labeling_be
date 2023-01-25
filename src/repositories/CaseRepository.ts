import { Case } from "../models";
import Repository from "./Repository";
import { ObjectId, InsertOneResult, ModifyResult } from "mongodb";

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
      return await this.queryCollection().find({}).toArray();
    });
  }

  public async insertCase(
    caseObj: Partial<Case>
  ): Promise<InsertOneResult<Case>> {
    return await this.execute(async () => {
      return await this.queryCollection().insertOne(caseObj);
    });
  }

  public async setCaseLabelled(id: string): Promise<Case> {
    return await this.execute(async () => {
      const res = await this.queryCollection().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { labelled: true } }
      );

      if (!res.ok) {
        throw Error();
      }

      return res.value;
    });
  }
}
