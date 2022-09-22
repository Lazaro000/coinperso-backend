import { authMiddleware } from '#Middlewares/auth.middleware.js';
import { Router } from 'express';
import container from '../../container.js';

const router = Router();

const userLoginController = container.resolve('userLoginController');
const userRegisterController = container.resolve('userRegisterController');
const userProfileController = container.resolve('userProfileController');

router.post('/login', userLoginController.execute.bind(userLoginController));
router.post(
  '/register',
  userRegisterController.execute.bind(userRegisterController)
);
router.post(
  '/profile',
  authMiddleware,
  userProfileController.execute.bind(userProfileController)
);

export const userRoutes = router;
