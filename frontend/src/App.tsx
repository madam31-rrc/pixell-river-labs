import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import Organization from './components/Organization';
import { getDepartments } from './api';
import type { Department } from './api';
import './App.css';

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const fetchDepartments = useCallback(async () => {
    const data = await getDepartments();
    setDepartments(data);
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/employees" replace />} />
          <Route
            path="employees"
            element={
              <div>
                <EmployeeList departments={departments} />
                <AddEmployeeForm
                  departments={departments}
                  onAddEmployee={fetchDepartments}
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
