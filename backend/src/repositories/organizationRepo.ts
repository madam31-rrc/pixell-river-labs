import { prisma } from '../db/prisma';
import type { Role } from '../types/Role';

class OrganizationRepository {
  async getRoles(): Promise<Role[]> {
    const rows = await prisma.organizationRole.findMany();
    return rows.map(r => ({ firstName: r.firstName, lastName: r.lastName, role: r.title }));
  }

  async isRoleOccupied(roleName: string): Promise<boolean> {
    const count = await prisma.organizationRole.count({
      where: { title: { equals: roleName, mode: 'insensitive' } },
    });
    return count > 0;
  }

  async createRole(role: Role): Promise<boolean> {
    if (await this.isRoleOccupied(role.role)) return false;
    await prisma.organizationRole.create({
      data: { firstName: role.firstName, lastName: role.lastName, title: role.role },
    });
    return true;
  }
}

export const organizationRepo = new OrganizationRepository();
