import Condition from "./Condition";
import MongoDocument from "./MongoDocument";

export default interface Case extends MongoDocument {
  doctorId: number;
  label: Condition;
  time: Date;
  text: string;
  labelled: boolean;
}
