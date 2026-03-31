import { employeeRepo } from '../repositories/employeeRepo';
import type { Employee } from '../types/Employee';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class EmployeeService {
  
  // Validate employee data
  validateEmployee(firstName: string, lastName: string, departmentName: string): ValidationResult {
    const errors: string[] = [];

    // Validate first name (at least 3 characters)
    if (!firstName || firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    // Validate last name (required)
    if (!lastName || lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    // Validate department exists
    if (!departmentName || departmentName.trim().length === 0) {
      errors.push('Department is required');
    } else {
      const department = employeeRepo.getDepartmentByName(departmentName);
      if (!department) {
        errors.push('Department does not exist');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create an employee
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

  // Get all departments
  getDepartments() {
    return employeeRepo.getDepartments();
  }
}

// Export singleton instance
export const employeeService = new EmployeeService();