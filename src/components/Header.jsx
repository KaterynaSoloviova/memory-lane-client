import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo2.png";

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] shadow-sm border-b border-[#e8ddc7] relative">
      {/* Main header content */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMobileMenu}>
            <img src={logo} alt="Memory Lane Logo" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#8B4513] tracking-wide" style={{fontFamily: 'Great Vibes, cursive', fontWeight: '400', letterSpacing: '0.02em'}}>Memory Lane</span>
              <span className="text-xs sm:text-sm text-[#A0522D] italic font-light hidden sm:block">Preserve. Cherish. Remember.</span>
            </div>
          </NavLink>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {isLoggedIn && (
                <NavLink 
                  to="/capsules"
                  className="text-[#8B4513] hover:text-[#D2691E] transition-colors font-medium text-base lg:text-lg whitespace-nowrap"
                >
                  My Capsules
                </NavLink>
              )}
              
              <NavLink 
                to="/about" 
                className="text-[#8B4513] hover:text-[#D2691E] transition-colors font-medium text-base lg:text-lg whitespace-nowrap"
              >
                About Me
              </NavLink>
            </div>

            {/* Auth section */}
            <nav className="flex items-center gap-4 font-medium">
              {isLoggedIn ? (
                <>
                  <span className="text-[#8B4513] hover:text-[#A0522D] italic text-sm font-light whitespace-nowrap">
                    Hello, {user?.username}!
                  </span>
                  <button
                    onClick={logOutUser}
                    className="text-[#CD853F] hover:text-[#A0522D] transition-colors text-base whitespace-nowrap"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/signup"
                    className="text-[#8B4513] hover:text-[#D2691E] transition-colors text-base whitespace-nowrap"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink 
                    to="/login"
                    className="bg-[#CD853F] text-white px-4 lg:px-6 py-1.5 lg:py-2 rounded-full hover:bg-[#D2691E] transition-colors shadow-sm text-base whitespace-nowrap"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#8B4513] hover:text-[#D2691E] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slides down when open */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-3 sm:px-4 pb-4 bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] border-t border-[#e8ddc7]">
          <nav className="flex flex-col gap-4 pt-4">
            {/* Navigation Links */}
            {isLoggedIn && (
              <NavLink 
                to="/capsules"
                className="text-[#8B4513] hover:text-[#D2691E] transition-colors font-medium text-base py-2 border-b border-[#e8ddc7] last:border-b-0"
                onClick={closeMobileMenu}
              >
                My Capsules
              </NavLink>
            )}
            
            <NavLink 
              to="/about" 
              className="text-[#8B4513] hover:text-[#D2691E] transition-colors font-medium text-base py-2 border-b border-[#e8ddc7] last:border-b-0"
              onClick={closeMobileMenu}
            >
              About Me
            </NavLink>

            {/* Auth section */}
            <div className="flex flex-col gap-3 pt-2">
              {isLoggedIn ? (
                <>
                  <span className="text-[#8B4513] italic text-sm font-light">
                    Hello, {user?.username}!
                  </span>
                  <button
                    onClick={() => {
                      logOutUser();
                      closeMobileMenu();
                    }}
                    className="text-[#CD853F] hover:text-[#A0522D] transition-colors text-base text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/signup"
                    className="text-[#8B4513] hover:text-[#D2691E] transition-colors text-base py-2"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </NavLink>
                  <NavLink 
                    to="/login"
                    className="bg-[#CD853F] text-white px-4 py-2 rounded-full hover:bg-[#D2691E] transition-colors shadow-sm text-base text-center"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
