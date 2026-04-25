import { employeeRepo } from '../repositories/employeeRepo';
import type { Employee } from '../types/Employee';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EmployeeService {
  async validateEmployee(firstName: string, lastName: string, departmentName: string): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!firstName || firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    if (!lastName || lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    if (!departmentName || departmentName.trim().length === 0) {
      errors.push('Department is required');
    } else {
      const department = await employeeRepo.getDepartmentByName(departmentName);
      if (!department) {
        errors.push('Department does not exist');
      }
    }

    return { isValid: errors.length === 0, errors };
  }

  async createEmployee(firstName: string, lastName: string, departmentName: string): Promise<ValidationResult> {
    const validation = await this.validateEmployee(firstName, lastName, departmentName);

    if (!validation.isValid) return validation;

    const newEmployee: Employee = { firstName: firstName.trim(), lastName: lastName.trim() };
    const success = await employeeRepo.createEmployee(newEmployee, departmentName);

    if (!success) {
      return { isValid: false, errors: ['Failed to add employee to department'] };
    }

    return { isValid: true, errors: [] };
  }

  async getDepartments() {
    return employeeRepo.getDepartments();
  }
}

export const employeeService = new EmployeeService();
