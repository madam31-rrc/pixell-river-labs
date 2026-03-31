import type { Role } from '../types/Role';
import { organizationData as initialOrganizationData } from '../data/organization';

class OrganizationRepository {
  private roles: Role[] = [];

  constructor() {
    // Initialize with data
    this.roles = JSON.parse(JSON.stringify(initialOrganizationData));
  }

  // Get all roles
  getRoles(): Role[] {
    return this.roles;
  }

  // Check if a role is already occupied
  isRoleOccupied(roleName: string): boolean {
    return this.roles.some(r => r.role.toLowerCase() === roleName.toLowerCase());
  }

  // Create a new role
  createRole(role: Role): boolean {
    if (this.isRoleOccupied(role.role)) {
      return false;
    }

    this.roles.push(role);
    return true;
  }
}

// Export singleton instance
export const organizationRepo = new OrganizationRepository();