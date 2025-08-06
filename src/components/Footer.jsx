import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#f3eee5] border-t border-[#d6cdbf] text-sm text-gray-700 font-serif">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Project info */}
        <p className="mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Memory Lane. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername" // <-- replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 underline"
          >
            GitHub
          </a>
          <NavLink to="/about" className="hover:text-gray-900 underline">
            About Me
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
