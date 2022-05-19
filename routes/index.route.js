import { Router } from 'express';
// const userRoutes = require('./user.route');
import authRoutes from './auth.route.js';
const router = Router();
/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);

export default router;