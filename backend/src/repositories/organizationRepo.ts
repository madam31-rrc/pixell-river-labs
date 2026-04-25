import { prisma } from '../db/prisma';
import type { Role } from '../types/Role';

class OrganizationRepository {
  async getRoles(): Promise<Role[]> {
    const rows = await prisma.organizationRole.findMany();
    return rows.map(r => ({ id: r.id, firstName: r.firstName, lastName: r.lastName, role: r.title }));
  }

  async isRoleOccupied(roleName: string, excludeId?: number): Promise<boolean> {
    const count = await prisma.organizationRole.count({
      where: {
        title: { equals: roleName, mode: 'insensitive' },
        ...(excludeId !== undefined ? { NOT: { id: excludeId } } : {}),
      },
    });
    return count > 0;
  }

  async createRole(role: Omit<Role, 'id'>): Promise<boolean> {
    if (await this.isRoleOccupied(role.role)) return false;
    await prisma.organizationRole.create({
      data: { firstName: role.firstName, lastName: role.lastName, title: role.role },
    });
    return true;
  }

  async updateRole(id: number, firstName: string, lastName: string, title: string): Promise<boolean> {
    if (await this.isRoleOccupied(title, id)) return false;
    await prisma.organizationRole.update({
      where: { id },
      data: { firstName, lastName, title },
    });
    return true;
  }

  async deleteRole(id: number): Promise<boolean> {
    await prisma.organizationRole.delete({ where: { id } });
    return true;
  }
}

export const organizationRepo = new OrganizationRepository();
