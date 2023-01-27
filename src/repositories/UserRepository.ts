import { User } from "../models";
import Repository from "./Repository";

export default class UserRepository extends Repository {
  protected static readonly USER_COLLECTION = "user";
  private static instance: UserRepository;

  private constructor() {
    super(UserRepository.USER_COLLECTION);
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }

    return UserRepository.instance;
  }

  public async getUser(user: Partial<User>): Promise<User> {
    return (await this.queryCollection().findOne(user)) as User;
  }
}
