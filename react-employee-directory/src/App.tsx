import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import Organization from './components/Organization';
import { departments as initialDepartments } from './data/employees';
import type { Department, Employee } from './types/Employee';
import './App.css';

function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const handleAddEmployee = (employee: Employee, departmentName: string) => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route 
            path="employees" 
            element={
              <>
                <EmployeeList departments={departments} />
                <AddEmployeeForm 
                  departments={departments} 
                  onAddEmployee={handleAddEmployee} 
                />
              </>
            } 
          />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;