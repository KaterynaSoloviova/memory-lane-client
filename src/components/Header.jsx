import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo2.png";

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <header className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] shadow-sm px-2 sm:px-4 lg:px-6 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center border-b border-[#e8ddc7] gap-3 sm:gap-0">
      <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3 group">
        <img src={logo} alt="Memory Lane Logo" className="h-16 w-16 sm:h-20 sm:w-20 lg:h-25 lg:w-25 transition-transform group-hover:scale-105" />
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-bold text-[#8B4513] tracking-wide">Memory Lane</span>
          <span className="text-xs sm:text-sm text-[#A0522D] italic font-light">Preserve. Cherish. Remember.</span>
        </div>
      </NavLink>

      <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 lg:gap-6 font-medium text-base sm:text-lg lg:text-xl duration-200">

        {isLoggedIn ? (
          <>
            <NavLink 
              to="/capsules"
              className="text-[#8B4513] hover:text-[#D2691E] transition-colors"
            >
              My Capsules
            </NavLink>
            <span className="text-[#8B4513] bg-[#f0e6d2] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              Hello, {user?.username}!
            </span>
            <button
              onClick={logOutUser}
              className="text-[#CD853F] hover:text-[#A0522D] transition-colors text-sm sm:text-base lg:text-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/signup"
              className="text-[#8B4513] hover:text-[#D2691E] transition-colors"
            >
              Sign Up
            </NavLink>
            <NavLink 
              to="/login"
              className="bg-[#CD853F] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-[#D2691E] transition-colors shadow-sm text-sm sm:text-base lg:text-lg"
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
