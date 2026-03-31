import { Request, Response } from 'express';
import { organizationService } from '../services/organizationService';

class OrganizationController {
  
  // GET /api/organization - Get all roles
  getRoles(req: Request, res: Response) {
    try {
      const roles = organizationService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch roles' });
    }
  }

  // POST /api/organization - Create a new role
  createRole(req: Request, res: Response) {
    try {
      const { firstName, lastName, role } = req.body;

      // Validate request has required fields
      if (!firstName || !lastName || !role) {
        return res.status(400).json({ 
          error: 'Missing required fields: firstName, lastName, role' 
        });
      }

      // Call service to create role
      const result = organizationService.createRole(firstName, lastName, role);

      if (!result.isValid) {
        return res.status(400).json({ errors: result.errors });
      }

      res.status(201).json({ 
        message: 'Role created successfully',
        role: { firstName, lastName, role }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create role' });
    }
  }
}

// Export singleton instance
export const organizationController = new OrganizationController();