import { prisma } from '../db/prisma';
import type { Department, Employee } from '../types/Employee';

class EmployeeRepository {
  async getDepartments(): Promise<Department[]> {
    const rows = await prisma.department.findMany({ include: { employees: true } });
    return rows.map(d => ({
      name: d.name,
      employees: d.employees.map(e => ({ firstName: e.firstName, lastName: e.lastName })),
    }));
  }

  async getDepartmentByName(name: string): Promise<Department | undefined> {
    const row = await prisma.department.findUnique({
      where: { name },
      include: { employees: true },
    });
    if (!row) return undefined;
    return {
      name: row.name,
      employees: row.employees.map(e => ({ firstName: e.firstName, lastName: e.lastName })),
    };
  }

  async createEmployee(employee: Employee, departmentName: string): Promise<boolean> {
    const dept = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!dept) return false;
    await prisma.employee.create({
      data: { firstName: employee.firstName, lastName: employee.lastName, departmentId: dept.id },
    });
    return true;
  }
}

export const employeeRepo = new EmployeeRepository();
