import { DeleteResult, MongoClient } from "mongodb";
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

  public static async closeConnections() {
    if (Repository.client) {
      await Repository.client.close();
    }
  }

  public async clearCollection(): Promise<DeleteResult> {
    return await this.queryCollection().deleteMany({});
  }
}
