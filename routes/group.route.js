import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import create, { getGroup, searchGroup, joinGroup, joinGroupViaLink } from '../controllers/group.controller.js';

const router = Router();

router.post('/add', auth, create);
router.get('/', auth, getGroup);
router.get('/search', auth, searchGroup);
router.post('/join', auth, joinGroup);
router.get('/accept/:groupId', auth, joinGroupViaLink);

export default router;