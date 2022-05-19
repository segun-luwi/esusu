import { Router } from 'express';
import register, { login } from '../controllers/auth.controller.js';

const router = Router();
export default router;

router.post('/register', register);
router.post('/login', login);