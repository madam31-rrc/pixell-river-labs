import { Router } from 'express';
import { organizationController } from '../controllers/organizationController';

const router = Router();

// GET /api/organization - Get all roles
router.get('/', (req, res) => organizationController.getRoles(req, res));

// POST /api/organization - Create a new role
router.post('/', (req, res) => organizationController.createRole(req, res));

export default router;