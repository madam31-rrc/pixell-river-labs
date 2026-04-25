import { organizationRepo } from '../repositories/organizationRepo';
import AddRoleForm from './AddRoleForm';

interface OrganizationProps {
  refreshKey: number;
  onRoleAdded: () => void;
}

function Organization({ refreshKey, onRoleAdded }: OrganizationProps) {
  const roles = organizationRepo.getRoles();

  return (
    <div key={refreshKey}>
      <main className="main">
        <div className="organization-section">
          <h2>Leadership & Management</h2>
          <div className="role-list">
            {roles.map((person, index) => (
              <div key={index} className="role-item">
                <div className="person-name">
                  {person.firstName} {person.lastName}
                </div>
                <div className="person-role">{person.role}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AddRoleForm onAddRole={onRoleAdded} />
    </div>
  );
}

export default Organization;