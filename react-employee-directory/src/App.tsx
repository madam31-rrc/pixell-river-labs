import Header from './components/Header';
import Footer from './components/Footer';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <EmployeeList />
      <Footer />
    </div>
  );
}

export default App;