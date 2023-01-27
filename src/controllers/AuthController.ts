import express, { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models";

const router = express.Router();
const userRepo = UserRepository.getInstance();

//NOTE: important things missing from authentication: 
  // - check auth by middleware
  // - hash password
router.post(
  "/login",
  async (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response<User>
  ) => {
    const fetchedUser = await userRepo.getUser({ username: req.body.username });

    if (fetchedUser.password === req.body.password) {
      req.session.userId = fetchedUser._id.toString();
      res.status(200).send();
    } else {
      //login fail
      console.warn(`could not login...`);
      res.status(401).send();
    }
  }
);

export default router;
