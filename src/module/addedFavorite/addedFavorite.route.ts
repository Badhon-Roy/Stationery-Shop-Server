import { Router } from 'express';
import { FavoriteControllers } from './addedFavorite.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/', auth(USER_ROLE?.user, USER_ROLE?.admin), FavoriteControllers.createFavorite);
router.get('/:id', FavoriteControllers.getSpecifFavorite);
router.get('/', FavoriteControllers.getAllFavorite);
router.delete('/:id', auth(USER_ROLE?.user, USER_ROLE?.admin), FavoriteControllers.deleteFavorite);

export const favoriteRouter = router;
