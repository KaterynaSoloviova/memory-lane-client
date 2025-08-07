import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { isLoggedIn, logOutUser} = useContext(AuthContext);

  return (
    <header className="bg-yellow-100 p-4 flex justify-between items-center">
      <NavLink to="/" className="text-xl font-retro">
        🕰️ Memory Lane
      </NavLink>
      <nav className="space-x-4">
        <NavLink to="/">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/create-capsule">Create Capsule</NavLink>
            <button onClick={logOutUser} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
