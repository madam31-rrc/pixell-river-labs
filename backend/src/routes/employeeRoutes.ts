import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';

const router = Router();

// GET /api/employees - Get all departments with employees
router.get('/', (req, res) => employeeController.getDepartments(req, res));

// POST /api/employees - Create a new employee
router.post('/', (req, res) => employeeController.createEmployee(req, res));

export default router;