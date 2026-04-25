import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';
import { clerkRequireAuth, requireOrgAdmin } from '../middleware/requireAuth';

const router = Router();

router.get('/', (req, res) => employeeController.getDepartments(req, res));
router.post('/', clerkRequireAuth, (req, res) => employeeController.createEmployee(req, res));
router.put('/:id', clerkRequireAuth, requireOrgAdmin, (req, res) => employeeController.updateEmployee(req, res));
router.delete('/:id', clerkRequireAuth, requireOrgAdmin, (req, res) => employeeController.deleteEmployee(req, res));

export default router;
