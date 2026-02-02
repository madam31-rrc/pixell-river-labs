import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/employees" className="nav-link">
        Employees
      </Link>
      <Link to="/organization" className="nav-link">
        Organization
      </Link>
    </nav>
  );
}

export default Navbar;