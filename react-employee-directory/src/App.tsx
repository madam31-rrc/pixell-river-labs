import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import Organization from './components/Organization';
import { employeeRepo } from './repositories/employeeRepo';
import { organizationRepo } from './repositories/organizationRepo';
import { departments as initialDepartments } from './data/employees';
import { organizationData as initialOrganizationData } from './data/organization';
import './App.css';

function App() {
  const [employeeRefreshKey, setEmployeeRefreshKey] = useState(0);
  const [organizationRefreshKey, setOrganizationRefreshKey] = useState(0);

  // Initialize repositories with data on first load
  useEffect(() => {
    const departmentsCopy = JSON.parse(JSON.stringify(initialDepartments));
    employeeRepo.setDepartments(departmentsCopy);
    
    const organizationCopy = JSON.parse(JSON.stringify(initialOrganizationData));
    organizationRepo.setRoles(organizationCopy);
    
    setEmployeeRefreshKey(prev => prev + 1);
    setOrganizationRefreshKey(prev => prev + 1);
  }, []);

  // Get data from repositories
  const departments = employeeRepo.getDepartments();

  // Callbacks to refresh views
  const handleEmployeeAdded = () => {
    setEmployeeRefreshKey(prev => prev + 1);
  };

  const handleRoleAdded = () => {
    setOrganizationRefreshKey(prev => prev + 1);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route 
            path="employees" 
            element={
              <div key={employeeRefreshKey}>
                <EmployeeList departments={departments} />
                <AddEmployeeForm 
                  departments={departments} 
                  onAddEmployee={handleEmployeeAdded} 
                />
              </div>
            } 
          />
          <Route 
            path="organization" 
            element={
              <Organization 
                refreshKey={organizationRefreshKey}
                onRoleAdded={handleRoleAdded}
              />
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;