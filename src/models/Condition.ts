import MongoDocument from "./MongoDocument";

export default interface Condition extends MongoDocument {
  icd10: string;
  description: string;
}
