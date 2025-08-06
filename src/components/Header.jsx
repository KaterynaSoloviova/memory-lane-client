import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#f3eee5] border-b border-[#d6cdbf] shadow-sm font-serif">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Project Name */}
        <NavLink
          to="/"
          className="text-3xl text-gray-800 font-bold tracking-wide hover:text-gray-600"
        >
          🧳 Memory Lane
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex gap-4 items-center">
          <NavLink
            to="/"
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className="text-sm bg-blue-100 text-blue-800 px-4 py-1 rounded hover:bg-blue-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-sm bg-green-100 text-green-800 px-4 py-1 rounded hover:bg-green-200"
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
