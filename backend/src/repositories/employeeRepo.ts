import { prisma } from '../db/prisma';
import type { Department, Employee } from '../types/Employee';

class EmployeeRepository {
  async getDepartments(): Promise<Department[]> {
    const rows = await prisma.department.findMany({ include: { employees: true } });
    return rows.map(d => ({
      name: d.name,
      employees: d.employees.map(e => ({ id: e.id, firstName: e.firstName, lastName: e.lastName })),
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
      employees: row.employees.map(e => ({ id: e.id, firstName: e.firstName, lastName: e.lastName })),
    };
  }

  async createEmployee(employee: Omit<Employee, 'id'>, departmentName: string): Promise<boolean> {
    const dept = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!dept) return false;
    await prisma.employee.create({
      data: { firstName: employee.firstName, lastName: employee.lastName, departmentId: dept.id },
    });
    return true;
  }

  async updateEmployee(id: number, firstName: string, lastName: string, departmentName: string): Promise<boolean> {
    const dept = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!dept) return false;
    await prisma.employee.update({
      where: { id },
      data: { firstName, lastName, departmentId: dept.id },
    });
    return true;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await prisma.employee.delete({ where: { id } });
    return true;
  }
}

export const employeeRepo = new EmployeeRepository();
