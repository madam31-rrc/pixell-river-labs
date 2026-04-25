import { Link } from 'react-router-dom';
import { useAuth, SignInButton, UserButton } from '@clerk/react';

function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/employees" className="nav-link">
          Employees
        </Link>
        <Link to="/organization" className="nav-link">
          Organization
        </Link>
      </div>
      <div className="nav-auth">
        {isLoaded && !isSignedIn && (
          <SignInButton mode="modal">
            <button className="nav-auth-btn">Log In</button>
          </SignInButton>
        )}
        {isLoaded && isSignedIn && <UserButton />}
      </div>
    </nav>
  );
}

export default Navbar;
