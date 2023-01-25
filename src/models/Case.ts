import MongoDocument from "./MongoDocument";

export default interface Case extends MongoDocument {
  doctor_id: number;
  label: string;
  time: Date;
  text: string;
  labelled: boolean;
}
