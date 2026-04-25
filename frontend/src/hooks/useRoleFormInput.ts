import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { createRole } from '../api';

export function useRoleFormInput() {
  const { getToken } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (onSuccess?: () => void) => {
    setErrors([]);

    const validationErrors: string[] = [];
    if (!firstName || firstName.trim().length < 3) {
      validationErrors.push('First name must be at least 3 characters long');
    }
    if (!lastName || lastName.trim().length === 0) {
      validationErrors.push('Last name is required');
    }
    if (!role || role.trim().length === 0) {
      validationErrors.push('Role is required');
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = await getToken();
      await createRole(firstName.trim(), lastName.trim(), role.trim(), token);
      setFirstName('');
      setLastName('');
      setRole('');
      onSuccess?.();
    } catch (err) {
      setErrors([err instanceof Error ? err.message : 'Failed to add role']);
    }
  };

  return {
    firstName,
    lastName,
    role,
    errors,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit,
  };
}
