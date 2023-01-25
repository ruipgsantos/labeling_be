import { ObjectId } from "mongodb";

export default interface MongoDocument {
  _id: ObjectId;
}
