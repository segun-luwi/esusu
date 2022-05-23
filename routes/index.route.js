import { Router } from 'express';
import authRoutes from './auth.route.js';
import groupRoutes from './group.route.js';
const router = Router();
/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.status(200).send({ message: 'OK' }),
);

router.use('/auth', authRoutes);
router.use('/group', groupRoutes);

export default router;