import { departments } from '../data/employees';
import DepartmentSection from './DepartmentSection';

function EmployeeList() {
  return (
    <main className="main">
      {departments.map((department, index) => (
        <DepartmentSection key={index} department={department} />
      ))}
    </main>
  );
}

export default EmployeeList;