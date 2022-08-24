import {
  userLoginController,
  userRegisterController,
} from '#Controllers/user.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/login', userLoginController);
router.post('/register', userRegisterController);

export const userRoutes = router;
