import type { Department } from '../types/Employee';
import DepartmentSection from './DepartmentSection';

interface EmployeeListProps {
  departments: Department[];
  onRefresh: () => void;
}

function EmployeeList({ departments, onRefresh }: EmployeeListProps) {
  const allDepartmentNames = departments.map((d) => d.name);

  return (
    <main className="main">
      {departments.map((department) => (
        <DepartmentSection
          key={department.name}
          department={department}
          allDepartmentNames={allDepartmentNames}
          onRefresh={onRefresh}
        />
      ))}
    </main>
  );
}

export default EmployeeList;
