import { Router } from 'express';
import { organizationController } from '../controllers/organizationController';
import { clerkRequireAuth, requireOrgAdmin } from '../middleware/requireAuth';

const router = Router();

router.get('/', (req, res) => organizationController.getRoles(req, res));
router.post('/', clerkRequireAuth, (req, res) => organizationController.createRole(req, res));
router.put('/:id', clerkRequireAuth, requireOrgAdmin, (req, res) => organizationController.updateRole(req, res));
router.delete('/:id', clerkRequireAuth, requireOrgAdmin, (req, res) => organizationController.deleteRole(req, res));

export default router;
