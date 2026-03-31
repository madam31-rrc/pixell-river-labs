import { useRoleFormInput } from '../hooks/useRoleFormInput';

interface AddRoleFormProps {
  onAddRole: () => void;
}

function AddRoleForm({ onAddRole }: AddRoleFormProps) {
  const {
    firstName,
    lastName,
    role,
    errors,
    setFirstName,
    setLastName,
    setRole,
    handleSubmit
  } = useRoleFormInput();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    handleSubmit(() => {
      // Notify parent component to refresh
      onAddRole();
    });
  };

  return (
    <div className="add-employee-form">
      <h2>Add New Leadership Role</h2>
      
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
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (e.g., VP of Marketing)"
          />
        </div>

        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error">{error}</p>
            ))}
          </div>
        )}

        <button type="submit">Add Role</button>
      </form>
    </div>
  );
}

export default AddRoleForm;