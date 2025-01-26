import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/login', 
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
)

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );

  router.put(
    '/update-role/:userId',
    auth(USER_ROLE.admin),
    AuthControllers.updateRole,
  );

router.post('/logout',
  AuthControllers.logoutUser
)



export const AuthRouter = router;