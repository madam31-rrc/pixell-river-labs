import type { Department, Employee } from '../types/Employee';

class EmployeeRepository {
  private departments: Department[] = [];

  setDepartments(departments: Department[]): void {
    this.departments = departments;
  }

  getDepartments(): Department[] {
    return this.departments;
  }

  getDepartmentByName(name: string): Department | undefined {
    return this.departments.find(dept => dept.name === name);
  }

  createEmployee(employee: Employee, departmentName: string): boolean {
    const department = this.getDepartmentByName(departmentName);
    
    if (!department) {
      return false;
    }

    department.employees.push(employee);
    return true;
  }

  getAllEmployees(): Employee[] {
    return this.departments.flatMap(dept => dept.employees);
  }
}

export const employeeRepo = new EmployeeRepository();