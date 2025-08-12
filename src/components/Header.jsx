import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo2.png";

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-[#f5f0e8] to-[#faf7f2] shadow-sm px-6 py-4 flex justify-between items-center border-b border-[#e8ddc7]">
      <NavLink to="/" className="flex items-center space-x-3 group">
        <img src={logo} alt="Memory Lane Logo" className="h-25 w-25 transition-transform group-hover:scale-105" />
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#8B4513] tracking-wide">Memory Lane</span>
          <span className="text-sm text-[#A0522D] italic font-light">Preserve. Cherish. Remember.</span>
        </div>
      </NavLink>

      <nav className="flex items-center space-x-6">

        {isLoggedIn ? (
          <>
            <NavLink 
              to="/capsules"
              className="text-[#8B4513] font-medium hover:text-[#D2691E] transition-colors duration-200"
            >
              My Capsules
            </NavLink>
            <NavLink 
              to="/create-capsule"
              className="text-[#8B4513] font-medium hover:text-[#D2691E] transition-colors duration-200"
            >
              Create Capsule
            </NavLink>
            <span className="font-medium text-[#8B4513] bg-[#f0e6d2] px-3 py-1 rounded-full text-sm">
              Hello, {user?.username}!
            </span>
            <button
              onClick={logOutUser}
              className="text-[#CD853F] hover:text-[#A0522D] font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/signup"
              className="text-[#8B4513] font-medium hover:text-[#D2691E] transition-colors duration-200"
            >
              Sign Up
            </NavLink>
            <NavLink 
              to="/login"
              className="bg-[#CD853F] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D2691E] transition-colors duration-200 shadow-sm"
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
