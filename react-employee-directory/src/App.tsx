import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import { departments as initialDepartments } from './data/employees';
import type { Department, Employee } from './types/Employee';
import './App.css';

function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const handleAddEmployee = (employee: Employee, departmentName: string) => {
    // Create a new departments array with the updated department
    const updatedDepartments = departments.map(dept => {
      if (dept.name === departmentName) {
        return {
          ...dept,
          employees: [...dept.employees, employee]
        };
      }
      return dept;
    });
    
    setDepartments(updatedDepartments);
  };

  return (
    <div className="app">
      <Header />
      <EmployeeList departments={departments} />
      <AddEmployeeForm 
        departments={departments} 
        onAddEmployee={handleAddEmployee} 
      />
      <Footer />
    </div>
  );
}

export default App;