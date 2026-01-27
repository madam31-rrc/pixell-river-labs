import { useState } from 'react';
import type { Department, Employee } from '../types/Employee';

interface AddEmployeeFormProps {
  departments: Department[];
  onAddEmployee: (employee: Employee, departmentName: string) => void;
}

function AddEmployeeForm({ departments, onAddEmployee }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);
    
    // Validation
    const newErrors: string[] = [];
    
    if (firstName.trim().length < 3) {
      newErrors.push('First name must be at least 3 characters long');
    }
    
    if (lastName.trim().length === 0) {
      newErrors.push('Last name is required');
    }
    
    if (selectedDepartment === '') {
      newErrors.push('Please select a department');
    }
    
    // If there are errors, show them and don't submit
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, add the employee
    const newEmployee: Employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };
    
    onAddEmployee(newEmployee, selectedDepartment);
    
    // Clear the form
    setFirstName('');
    setLastName('');
    setSelectedDepartment('');
  };

  return (
    <div className="add-employee-form">
      <h2>Add New Employee</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">-- Select Department --</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;