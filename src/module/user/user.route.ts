import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";


const router = Router();
router.post('/create-user', UserControllers.createUser)
router.get('/get-user',
    UserControllers.getAllUser)
router.get('/get-user/:userId',
    UserControllers.getSingleUser)
router.put(
    '/update-user/:userId',
    UserControllers.updateUser,
);

router.delete(
    '/delete-user/:userId',
    auth(USER_ROLE.admin),
    UserControllers.deleteUser,
);

export const userRouter = router;