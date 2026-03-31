import { organizationRepo } from '../repositories/organizationRepo';
import type { Role } from '../types/Role';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class OrganizationService {
  
  // Validate role data
  validateRole(firstName: string, lastName: string, role: string): ValidationResult {
    const errors: string[] = [];

    // Validate first name (at least 3 characters)
    if (!firstName || firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    // Validate last name (required)
    if (!lastName || lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    // Validate role (required)
    if (!role || role.trim().length === 0) {
      errors.push('Role is required');
    } else if (organizationRepo.isRoleOccupied(role.trim())) {
      errors.push('This role is already occupied by another person');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create a role
  createRole(firstName: string, lastName: string, role: string): ValidationResult {
    const validation = this.validateRole(firstName, lastName, role);
    
    if (!validation.isValid) {
      return validation;
    }

    const newRole: Role = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim()
    };

    const success = organizationRepo.createRole(newRole);

    if (!success) {
      return {
        isValid: false,
        errors: ['Failed to add role to organization']
      };
    }

    return {
      isValid: true,
      errors: []
    };
  }

  // Get all roles
  getRoles() {
    return organizationRepo.getRoles();
  }
}

// Export singleton instance
export const organizationService = new OrganizationService();