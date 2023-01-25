import express, { Request, Response } from "express";

// declare module "express-session" {
//   export interface SessionData {
//     isAuthenticated: boolean;
//     userId: number;
//   }
// }

const router = express.Router();

router.get(
  "/nonce/:pubkey",
  (req: Request<{ pubkey: string }>, res: Response<{ nonce: string }>) => {}
);

// router.post(
//   "/login",
//   async (
//     req: Request<{}, {}, { pubkey: string; signedmsg: string }>,
//     res: Response<User>
//   ) => {
//   }
// );

export default router;
