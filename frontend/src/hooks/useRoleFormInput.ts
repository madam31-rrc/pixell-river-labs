import { useState } from 'react';
import { organizationService } from '../services/organizationService';

interface RoleFormState {
  firstName: string;
  lastName: string;
  role: string;
  errors: string[];
}

export function useRoleFormInput() {
  const [formState, setFormState] = useState<RoleFormState>({
    firstName: '',
    lastName: '',
    role: '',
    errors: []
  });

  // Update firstName
  const setFirstName = (value: string) => {
    setFormState(prev => ({ ...prev, firstName: value }));
  };

  // Update lastName
  const setLastName = (value: string) => {
    setFormState(prev => ({ ...prev, lastName: value }));
  };

  // Update role
  const setRole = (value: string) => {
    setFormState(prev => ({ ...prev, role: value }));
  };

  // Clear all errors
  const clearErrors = () => {
    setFormState(prev => ({ ...prev, errors: [] }));
  };

  // Handle form submission with validation
  const handleSubmit = (onSuccess?: () => void) => {
    // Clear previous errors
    clearErrors();

    // Call the service to validate and create role
    const result = organizationService.createRole(
      formState.firstName,
      formState.lastName,
      formState.role
    );

    if (!result.isValid) {
      // Show validation errors
      setFormState(prev => ({ ...prev, errors: result.errors }));
      return false;
    }

    // Success! Clear the form
    setFormState({
      firstName: '',
      lastName: '',
      role: '',
      errors: []
    });

    // Call success callback if provided
    if (onSuccess) {
      onSuccess();
    }

    return true;
  };

  // Reset the form
  const resetForm = () => {
    setFormState({
      firstName: '',
      lastName: '',
      role: '',
      errors: []
    });
  };

  return {
    firstName: formState.firstName,
    lastName: formState.lastName,
    role: formState.role,
    errors: formState.errors,
    setFirstName,
    setLastName,
    setRole,
    clearErrors,
    handleSubmit,
    resetForm
  };
}