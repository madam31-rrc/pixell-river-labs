import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';
import { departments as initialDepartments } from './data/employees';
import type { Department } from './types/Employee';
import './App.css';

function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  return (
    <div className="app">
      <Header />
      <EmployeeList departments={departments} />
      <Footer />
    </div>
  );
}

export default App;