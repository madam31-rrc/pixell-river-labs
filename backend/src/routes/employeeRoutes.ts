import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';
import { clerkRequireAuth } from '../middleware/requireAuth';

const router = Router();

router.get('/', (req, res) => employeeController.getDepartments(req, res));
router.post('/', clerkRequireAuth, (req, res) => employeeController.createEmployee(req, res));

export default router;
