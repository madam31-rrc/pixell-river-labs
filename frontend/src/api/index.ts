import type { Department } from '../types/Employee';
import type { Role } from '../types/Role';

export type { Department, Role };

export async function getDepartments(): Promise<Department[]> {
  const res = await fetch('/api/employees');
  if (!res.ok) throw new Error('Failed to fetch departments');
  return res.json();
}

export async function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): Promise<void> {
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, departmentName }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to create employee');
  }
}

export async function getRoles(): Promise<Role[]> {
  const res = await fetch('/api/organization');
  if (!res.ok) throw new Error('Failed to fetch roles');
  return res.json();
}

export async function createRole(
  firstName: string,
  lastName: string,
  role: string
): Promise<void> {
  const res = await fetch('/api/organization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, role }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to create role');
  }
}
