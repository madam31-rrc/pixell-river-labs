import type { Department } from '../types/Employee';
import DepartmentSection from './DepartmentSection';

interface EmployeeListProps {
  departments: Department[];
}

function EmployeeList({ departments }: EmployeeListProps) {
  return (
    <main className="main">
      {departments.map((department, index) => (
        <DepartmentSection key={index} department={department} />
      ))}
    </main>
  );
}

export default EmployeeList;