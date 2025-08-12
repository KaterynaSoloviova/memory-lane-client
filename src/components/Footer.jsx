import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] border-t border-[#e8ddc7] text-sm font-serif">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Project info */}
        <p className="mb-2 md:mb-0 text-[#8B4513]">
          &copy; {new Date().getFullYear()} Memory Lane. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername" // <-- replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B4513] hover:text-[#D2691E] transition-colors underline"
          >
            GitHub
          </a>
          <NavLink to="/about" className="text-[#8B4513] hover:text-[#D2691E] transition-colors underline">
            About Me
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
