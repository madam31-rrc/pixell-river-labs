import { Router } from 'express';
import { organizationController } from '../controllers/organizationController';
import { clerkRequireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/', (req, res) => organizationController.getRoles(req, res));
router.post('/', clerkRequireAuth, (req, res) => organizationController.createRole(req, res));

export default router;
