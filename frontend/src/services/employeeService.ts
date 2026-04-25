import { employeeRepo } from '../repositories/employeeRepo';
import type { Employee } from '../types/Employee';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EmployeeService {
  
  validateEmployee(firstName: string, lastName: string, departmentName: string): ValidationResult {
    const errors: string[] = [];

    if (firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    if (lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    const department = employeeRepo.getDepartmentByName(departmentName);
    if (!department) {
      errors.push('Please select a valid department');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  createEmployee(firstName: string, lastName: string, departmentName: string): ValidationResult {
    const validation = this.validateEmployee(firstName, lastName, departmentName);
    
    if (!validation.isValid) {
      return validation;
    }

    const newEmployee: Employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };

    const success = employeeRepo.createEmployee(newEmployee, departmentName);

    if (!success) {
      return {
        isValid: false,
        errors: ['Failed to add employee to department']
      };
    }

    return {
      isValid: true,
      errors: []
    };
  }
}

export const employeeService = new EmployeeService();