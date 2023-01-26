import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export default abstract class Repository {
  protected static readonly CASES_DATABASE = "cases";
  protected static client: MongoClient;
  protected collectionName: string;

  protected constructor(collectionName: string) {
    if (!Repository.client) {
      console.info(`URI: ${process.env.DATABASE_URL}`);
      Repository.client = new MongoClient(process.env.DATABASE_URL);
      Repository.client.connect();
    }
    this.collectionName = collectionName;
  }

  protected queryCollection() {
    return Repository.client
      .db(Repository.CASES_DATABASE)
      .collection(this.collectionName);
  }

  protected async execute(execFunction: () => any): Promise<any> {
    try {
      return await execFunction();
    } catch (e: any) {
      console.log(e);
    }
  }

  public static async closeConnections() {
    if (Repository.client) {
      await Repository.client.close();
    }
  }

  public async clearCollection(): Promise<void> {
    return await this.execute(async () => {
      return await this.queryCollection().deleteMany({});
    });
  }
}
