import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/react';
import AddRoleForm from './AddRoleForm';
import { getRoles, updateRole, deleteRole } from '../api';
import type { Role } from '../api';

function Organization() {
  const { getToken, has } = useAuth();
  const isAdmin = has({ role: 'org:admin' });

  const [roles, setRoles] = useState<Role[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFirst, setEditFirst] = useState('');
  const [editLast, setEditLast] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editError, setEditError] = useState('');

  const fetchRoles = useCallback(async () => {
    const data = await getRoles();
    setRoles(data);
  }, []);

  useEffect(() => { fetchRoles(); }, [fetchRoles]);

  const startEdit = (role: Role) => {
    setEditingId(role.id);
    setEditFirst(role.firstName);
    setEditLast(role.lastName);
    setEditTitle(role.role);
    setEditError('');
  };

  const cancelEdit = () => { setEditingId(null); setEditError(''); };

  const handleSave = async (id: number) => {
    setEditError('');
    try {
      const token = await getToken();
      await updateRole(id, editFirst.trim(), editLast.trim(), editTitle.trim(), token);
      setEditingId(null);
      fetchRoles();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this role?')) return;
    try {
      const token = await getToken();
      await deleteRole(id, token);
      fetchRoles();
    } catch {
      // silent
    }
  };

  return (
    <div>
      <main className="main">
        <div className="organization-section">
          <h2>Leadership &amp; Management</h2>
          <div className="role-list">
            {roles.map((person) =>
              editingId === person.id ? (
                <div key={person.id} className="role-item role-item--editing">
                  <div className="role-edit-form">
                    <input
                      value={editFirst}
                      onChange={(e) => setEditFirst(e.target.value)}
                      placeholder="First name"
                      aria-label="First name"
                    />
                    <input
                      value={editLast}
                      onChange={(e) => setEditLast(e.target.value)}
                      placeholder="Last name"
                      aria-label="Last name"
                    />
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Role title"
                      aria-label="Role title"
                    />
                  </div>
                  {editError && <p className="admin-inline-error">{editError}</p>}
                  <div className="admin-controls">
                    <button className="admin-btn admin-btn--save" onClick={() => handleSave(person.id)}>Save</button>
                    <button className="admin-btn admin-btn--cancel" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div key={person.id} className="role-item">
                  <div className="role-item-info">
                    <div className="person-name">{person.firstName} {person.lastName}</div>
                    <div className="person-role">{person.role}</div>
                  </div>
                  {isAdmin && (
                    <div className="admin-controls">
                      <button
                        className="admin-btn admin-btn--edit"
                        onClick={() => startEdit(person)}
                        aria-label="Edit role"
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn--delete"
                        onClick={() => handleDelete(person.id)}
                        aria-label="Delete role"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <AddRoleForm onAddRole={fetchRoles} />
    </div>
  );
}

export default Organization;
