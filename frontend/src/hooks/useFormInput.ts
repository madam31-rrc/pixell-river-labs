import { useState } from 'react';
import { employeeService } from '../services/employeeService';

interface FormState {
  firstName: string;
  lastName: string;
  department: string;
  errors: string[];
}

export function useFormInput() {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    department: '',
    errors: []
  });

  const setFirstName = (value: string) => {
    setFormState(prev => ({ ...prev, firstName: value }));
  };

  const setLastName = (value: string) => {
    setFormState(prev => ({ ...prev, lastName: value }));
  };

  const setDepartment = (value: string) => {
    setFormState(prev => ({ ...prev, department: value }));
  };

  const clearErrors = () => {
    setFormState(prev => ({ ...prev, errors: [] }));
  };

  const handleSubmit = (onSuccess?: () => void) => {
    clearErrors();

    const result = employeeService.createEmployee(
      formState.firstName,
      formState.lastName,
      formState.department
    );

    if (!result.isValid) {
      setFormState(prev => ({ ...prev, errors: result.errors }));
      return false;
    }

    setFormState({
      firstName: '',
      lastName: '',
      department: '',
      errors: []
    });

    if (onSuccess) {
      onSuccess();
    }

    return true;
  };

  const resetForm = () => {
    setFormState({
      firstName: '',
      lastName: '',
      department: '',
      errors: []
    });
  };

  return {
    firstName: formState.firstName,
    lastName: formState.lastName,
    department: formState.department,
    errors: formState.errors,
    setFirstName,
    setLastName,
    setDepartment,
    clearErrors,
    handleSubmit,
    resetForm
  };
}