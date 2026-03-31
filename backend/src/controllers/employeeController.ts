import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService';

class EmployeeController {
  
  // GET /api/employees - Get all departments with employees
  getDepartments(req: Request, res: Response) {
    try {
      const departments = employeeService.getDepartments();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  }

  // POST /api/employees - Create a new employee
  createEmployee(req: Request, res: Response) {
    try {
      const { firstName, lastName, departmentName } = req.body;

      // Validate request has required fields
      if (!firstName || !lastName || !departmentName) {
        return res.status(400).json({ 
          error: 'Missing required fields: firstName, lastName, departmentName' 
        });
      }

      // Call service to create employee
      const result = employeeService.createEmployee(firstName, lastName, departmentName);

      if (!result.isValid) {
        return res.status(400).json({ errors: result.errors });
      }

      res.status(201).json({ 
        message: 'Employee created successfully',
        employee: { firstName, lastName, departmentName }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create employee' });
    }
  }
}

// Export singleton instance
export const employeeController = new EmployeeController();