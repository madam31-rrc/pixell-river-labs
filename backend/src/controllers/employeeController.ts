import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService';

class EmployeeController {
  async getDepartments(_req: Request, res: Response) {
    try {
      const departments = await employeeService.getDepartments();
      res.status(200).json(departments);
    } catch {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  }

  async createEmployee(req: Request, res: Response) {
    try {
      const { firstName, lastName, departmentName } = req.body;
      if (!firstName || !lastName || !departmentName) {
        res.status(400).json({ error: 'Missing required fields: firstName, lastName, departmentName' });
        return;
      }
      const result = await employeeService.createEmployee(firstName, lastName, departmentName);
      if (!result.isValid) { res.status(400).json({ errors: result.errors }); return; }
      res.status(201).json({ message: 'Employee created successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to create employee' });
    }
  }

  async updateEmployee(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { firstName, lastName, departmentName } = req.body;
      if (!firstName || !lastName || !departmentName) {
        res.status(400).json({ error: 'Missing required fields: firstName, lastName, departmentName' });
        return;
      }
      const result = await employeeService.updateEmployee(id, firstName, lastName, departmentName);
      if (!result.isValid) { res.status(400).json({ errors: result.errors }); return; }
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to update employee' });
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await employeeService.deleteEmployee(id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  }
}

export const employeeController = new EmployeeController();
