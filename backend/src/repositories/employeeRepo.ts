import type { Department, Employee } from '../types/Employee';
import { departments as initialDepartments } from '../data/employees';

class EmployeeRepository {
  private departments: Department[] = [];

  constructor() {
    // Initialize with data
    this.departments = JSON.parse(JSON.stringify(initialDepartments));
  }

  // Get all departments
  getDepartments(): Department[] {
    return this.departments;
  }

  // Get a specific department by name
  getDepartmentByName(name: string): Department | undefined {
    return this.departments.find(dept => dept.name === name);
  }

  // Create a new employee in a specific department
  createEmployee(employee: Employee, departmentName: string): boolean {
    const department = this.getDepartmentByName(departmentName);
    
    if (!department) {
      return false;
    }

    department.employees.push(employee);
    return true;
  }

  // Get all employees across all departments
  getAllEmployees(): Employee[] {
    return this.departments.flatMap(dept => dept.employees);
  }
}

// Export singleton instance
export const employeeRepo = new EmployeeRepository();