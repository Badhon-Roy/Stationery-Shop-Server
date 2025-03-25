import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { CategoryControllers } from './category.controller';

const router = Router();

router.post('/', auth(USER_ROLE.admin),CategoryControllers.createCategory);
router.get('/:id',CategoryControllers.getSpecifCategory,);
router.get('/', CategoryControllers.getAllCategory);
router.put( '/:id',auth(USER_ROLE.admin),CategoryControllers.updateCategory,);
router.delete('/:id',auth(USER_ROLE.admin),CategoryControllers.deleteCategory,);

export const categoryRouter = router;
