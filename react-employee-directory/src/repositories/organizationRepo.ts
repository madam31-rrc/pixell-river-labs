import type { Role } from '../types/Role';

class OrganizationRepository {
  private roles: Role[] = [];

  // Initialize with data
  setRoles(roles: Role[]): void {
    this.roles = roles;
  }

  // Get all roles
  getRoles(): Role[] {
    return this.roles;
  }

  // Check if a role already exists (is occupied)
  isRoleOccupied(roleName: string): boolean {
    return this.roles.some(r => r.role.toLowerCase() === roleName.toLowerCase());
  }

  // Create a new role/person
  createRole(role: Role): boolean {
    // Don't add if role is already occupied
    if (this.isRoleOccupied(role.role)) {
      return false;
    }

    this.roles.push(role);
    return true;
  }

  // Get all roles (for dropdown or display)
  getAllRoleNames(): string[] {
    return this.roles.map(r => r.role);
  }
}

// Export a singleton instance
export const organizationRepo = new OrganizationRepository();