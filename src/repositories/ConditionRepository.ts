import { InsertManyResult, ObjectId } from "mongodb";
import { Condition } from "../models";
import Repository from "./Repository";

export default class ConditionRepository extends Repository {
  protected static readonly CONDITION_REPOSITORY = "condition";
  private static instance: ConditionRepository;

  private constructor() {
    super(ConditionRepository.CONDITION_REPOSITORY);
  }

  public static getInstance(): ConditionRepository {
    if (!ConditionRepository.instance) {
      ConditionRepository.instance = new ConditionRepository();
    }

    return ConditionRepository.instance;
  }

  public async insertConditions(
    conditions: Condition[]
  ): Promise<InsertManyResult<Condition>> {
    return await this.queryCollection().insertMany(conditions);
  }

  public async getAllConditions(): Promise<Condition[]> {
    return (await this.queryCollection().find({}).toArray()) as Condition[];
  }

  public async getCondition(_id: string): Promise<Condition> {
    return (await this.queryCollection().findOne({
      _id: new ObjectId(_id),
    })) as Condition;
  }
}
