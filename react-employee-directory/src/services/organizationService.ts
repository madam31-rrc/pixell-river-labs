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
    if (firstName.trim().length < 3) {
      errors.push('First name must be at least 3 characters long');
    }

    // Validate last name (required)
    if (lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    // Validate role (required)
    if (role.trim().length === 0) {
      errors.push('Role is required');
    }

    // Check if role is already occupied
    if (role.trim().length > 0 && organizationRepo.isRoleOccupied(role.trim())) {
      errors.push('This role is already occupied by another person');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Attempt to create a role
  createRole(firstName: string, lastName: string, role: string): ValidationResult {
    // First, validate the input
    const validation = this.validateRole(firstName, lastName, role);
    
    if (!validation.isValid) {
      return validation; // Return validation errors
    }

    // If validation passes, create the role
    const newRole: Role = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim()
    };

    const success = organizationRepo.createRole(newRole);

    if (!success) {
      return {
        isValid: false,
        errors: ['Failed to add person to organization']
      };
    }

    return {
      isValid: true,
      errors: []
    };
  }
}

// Export a singleton instance
export const organizationService = new OrganizationService();