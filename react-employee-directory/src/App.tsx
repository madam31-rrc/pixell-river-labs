import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import Organization from './components/Organization';
import { employeeRepo } from './repositories/employeeRepo';
import { departments as initialDepartments } from './data/employees';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    employeeRepo.setDepartments(initialDepartments);
  }, []);

  const departments = employeeRepo.getDepartments();

  const handleEmployeeAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route 
            path="employees" 
            element={
              <div key={refreshKey}>
                <EmployeeList departments={departments} />
                <AddEmployeeForm 
                  departments={departments} 
                  onAddEmployee={handleEmployeeAdded} 
                />
              </div>
            } 
          />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;