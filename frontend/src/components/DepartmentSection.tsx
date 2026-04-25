import { useState } from 'react';
import { useAuth } from '@clerk/react';
import { deleteEmployee, updateEmployee } from '../api';
import type { Department } from '../types/Employee';

interface DepartmentSectionProps {
  department: Department;
  allDepartmentNames: string[];
  onRefresh: () => void;
}

function DepartmentSection({ department, allDepartmentNames, onRefresh }: DepartmentSectionProps) {
  const { getToken, has } = useAuth();
  const isAdmin = has({ role: 'org:admin' });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFirst, setEditFirst] = useState('');
  const [editLast, setEditLast] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editError, setEditError] = useState('');

  const startEdit = (id: number, firstName: string, lastName: string) => {
    setEditingId(id);
    setEditFirst(firstName);
    setEditLast(lastName);
    setEditDept(department.name);
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError('');
  };

  const handleSave = async (id: number) => {
    setEditError('');
    try {
      const token = await getToken();
      await updateEmployee(id, editFirst.trim(), editLast.trim(), editDept, token);
      setEditingId(null);
      onRefresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this employee?')) return;
    try {
      const token = await getToken();
      await deleteEmployee(id, token);
      onRefresh();
    } catch {
      // silent — the list will remain unchanged
    }
  };

  return (
    <section className="department-section">
      <h2>{department.name}</h2>
      <ul className="employee-list">
        {department.employees.map((employee) =>
          editingId === employee.id ? (
            <li key={employee.id} className="employee-item employee-item--editing">
              <div className="employee-edit-form">
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
                <select
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
                  aria-label="Department"
                >
                  {allDepartmentNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              {editError && <p className="admin-inline-error">{editError}</p>}
              <div className="admin-controls">
                <button className="admin-btn admin-btn--save" onClick={() => employee.id !== undefined && handleSave(employee.id)}>Save</button>
                <button className="admin-btn admin-btn--cancel" onClick={cancelEdit}>Cancel</button>
              </div>
            </li>
          ) : (
            <li key={employee.id} className="employee-item">
              <span className="employee-name">{employee.firstName} {employee.lastName}</span>
              {isAdmin && (
                <div className="admin-controls">
                  <button
                    className="admin-btn admin-btn--edit"
                    onClick={() => employee.id !== undefined && startEdit(employee.id, employee.firstName, employee.lastName)}
                    aria-label="Edit employee"
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn--delete"
                    onClick={() => employee.id !== undefined && handleDelete(employee.id)}
                    aria-label="Delete employee"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default DepartmentSection;
