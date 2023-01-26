import express, { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models";

// declare module "express-session" {
//   export interface SessionData {
//     isAuthenticated: boolean;
//     userId: number;
//   }
// }

const router = express.Router();
const userRepo = UserRepository.getInstance();

router.post(
  "/login",
  async (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response<User>
  ) => {
    console.log(req.session);
    const fetchedUser = await userRepo.getUser({ username: req.body.username });

    if (fetchedUser.password === req.body.password) {
      // console.log(req.session);
      res.status(200).send();
    } else {
      //login fail
      console.warn(`could not login...`);
      res.status(401).send();
    }
  }
);

export default router;
