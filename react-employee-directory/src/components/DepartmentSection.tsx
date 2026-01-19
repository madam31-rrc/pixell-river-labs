import type { Department } from '../types/Employee';

interface DepartmentSectionProps {
  department: Department;
}

function DepartmentSection({ department }: DepartmentSectionProps) {
  return (
    <section className="department-section">
      <h2>{department.name}</h2>
      <ul className="employee-list">
        {department.employees.map((employee, index) => (
          <li key={index}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DepartmentSection;