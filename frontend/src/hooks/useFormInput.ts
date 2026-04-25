import { useState } from 'react';
import { createEmployee } from '../api';

export function useFormInput() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
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
    if (!department) {
      validationErrors.push('Department is required');
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createEmployee(firstName.trim(), lastName.trim(), department);
      setFirstName('');
      setLastName('');
      setDepartment('');
      onSuccess?.();
    } catch (err) {
      setErrors([err instanceof Error ? err.message : 'Failed to add employee']);
    }
  };

  return {
    firstName,
    lastName,
    department,
    errors,
    setFirstName,
    setLastName,
    setDepartment,
    handleSubmit,
  };
}
