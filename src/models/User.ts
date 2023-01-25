import MongoDocument from "./MongoDocument";

export default interface User extends MongoDocument {
  username: string;
  password: string;
}
