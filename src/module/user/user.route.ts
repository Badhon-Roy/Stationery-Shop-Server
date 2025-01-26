import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";


const router = Router();
router.post('/create-user', UserControllers.createUser)
router.get('/get-user',auth(), UserControllers.getAllUser)
router.get('/get-user/:userId', UserControllers.getSingleUser)

export const userRouter = router;