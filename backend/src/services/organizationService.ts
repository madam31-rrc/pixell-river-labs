import { organizationRepo } from '../repositories/organizationRepo';
import type { Role } from '../types/Role';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class OrganizationService {
  async validateRole(firstName: string, lastName: string, role: string): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!firstName || firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    if (!lastName || lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    if (!role || role.trim().length === 0) {
      errors.push('Role is required');
    } else if (await organizationRepo.isRoleOccupied(role.trim())) {
      errors.push('This role is already occupied by another person');
    }

    return { isValid: errors.length === 0, errors };
  }

  async createRole(firstName: string, lastName: string, role: string): Promise<ValidationResult> {
    const validation = await this.validateRole(firstName, lastName, role);

    if (!validation.isValid) return validation;

    const newRole: Role = { firstName: firstName.trim(), lastName: lastName.trim(), role: role.trim() };
    const success = await organizationRepo.createRole(newRole);

    if (!success) {
      return { isValid: false, errors: ['Failed to add role to organization'] };
    }

    return { isValid: true, errors: [] };
  }

  async getRoles() {
    return organizationRepo.getRoles();
  }
}

export const organizationService = new OrganizationService();
