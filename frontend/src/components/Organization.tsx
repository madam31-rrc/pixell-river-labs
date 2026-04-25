import { useState, useEffect, useCallback } from 'react';
import AddRoleForm from './AddRoleForm';
import { getRoles } from '../api';
import type { Role } from '../api';

function Organization() {
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchRoles = useCallback(async () => {
    const data = await getRoles();
    setRoles(data);
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <div>
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
      <AddRoleForm onAddRole={fetchRoles} />
    </div>
  );
}

export default Organization;
