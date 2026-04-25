import type { Department } from '../types/Employee';
import type { Role } from '../types/Role';

export type { Department, Role };

function authHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// ── Employees ────────────────────────────────────────────────────────────────

export async function getDepartments(): Promise<Department[]> {
  const res = await fetch('/api/employees');
  if (!res.ok) throw new Error('Failed to fetch departments');
  return res.json();
}

export async function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string,
  token: string | null
): Promise<void> {
  const res = await fetch('/api/employees', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ firstName, lastName, departmentName }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to create employee');
  }
}

export async function updateEmployee(
  id: number,
  firstName: string,
  lastName: string,
  departmentName: string,
  token: string | null
): Promise<void> {
  const res = await fetch(`/api/employees/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ firstName, lastName, departmentName }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to update employee');
  }
}

export async function deleteEmployee(id: number, token: string | null): Promise<void> {
  const res = await fetch(`/api/employees/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete employee');
}

// ── Organization Roles ───────────────────────────────────────────────────────

export async function getRoles(): Promise<Role[]> {
  const res = await fetch('/api/organization');
  if (!res.ok) throw new Error('Failed to fetch roles');
  return res.json();
}

export async function createRole(
  firstName: string,
  lastName: string,
  role: string,
  token: string | null
): Promise<void> {
  const res = await fetch('/api/organization', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ firstName, lastName, role }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to create role');
  }
}

export async function updateRole(
  id: number,
  firstName: string,
  lastName: string,
  role: string,
  token: string | null
): Promise<void> {
  const res = await fetch(`/api/organization/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ firstName, lastName, role }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error((data.errors as string[] | undefined)?.join(', ') ?? data.error ?? 'Failed to update role');
  }
}

export async function deleteRole(id: number, token: string | null): Promise<void> {
  const res = await fetch(`/api/organization/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete role');
}
