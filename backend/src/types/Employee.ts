export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}