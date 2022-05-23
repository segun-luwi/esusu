import { Router } from 'express';
// const userRoutes = require('./user.route');
import authRoutes from './auth.route.js';
import groupRoutes from './group.route.js';
const router = Router();
/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/group', groupRoutes);

export default router;