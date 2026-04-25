import { useAuth } from '@clerk/react';
import { useFormInput } from '../hooks/useFormInput';
import SignInPrompt from './SignInPrompt';
import type { Department } from '../types/Employee';

interface AddEmployeeFormProps {
  departments: Department[];
  onAddEmployee: () => void;
}

function AddEmployeeForm({ departments, onAddEmployee }: AddEmployeeFormProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const {
    firstName,
    lastName,
    department,
    errors,
    setFirstName,
    setLastName,
    setDepartment,
    handleSubmit,
  } = useFormInput();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onAddEmployee);
  };

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <SignInPrompt action="add new employees" />;
  }

  return (
    <div className="add-employee-form">
      <h2>Add New Employee</h2>

      <form onSubmit={onSubmit}>
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
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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
