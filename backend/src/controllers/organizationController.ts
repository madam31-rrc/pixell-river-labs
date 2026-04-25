import { Request, Response } from 'express';
import { organizationService } from '../services/organizationService';

class OrganizationController {
  async getRoles(_req: Request, res: Response) {
    try {
      const roles = await organizationService.getRoles();
      res.status(200).json(roles);
    } catch {
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }

  async createRole(req: Request, res: Response) {
    try {
      const { firstName, lastName, role } = req.body;
      if (!firstName || !lastName || !role) {
        res.status(400).json({ error: 'Missing required fields: firstName, lastName, role' });
        return;
      }
      const result = await organizationService.createRole(firstName, lastName, role);
      if (!result.isValid) { res.status(400).json({ errors: result.errors }); return; }
      res.status(201).json({ message: 'Role created successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to create role' });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { firstName, lastName, role } = req.body;
      if (!firstName || !lastName || !role) {
        res.status(400).json({ error: 'Missing required fields: firstName, lastName, role' });
        return;
      }
      const result = await organizationService.updateRole(id, firstName, lastName, role);
      if (!result.isValid) { res.status(400).json({ errors: result.errors }); return; }
      res.status(200).json({ message: 'Role updated successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to update role' });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await organizationService.deleteRole(id);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to delete role' });
    }
  }
}

export const organizationController = new OrganizationController();
