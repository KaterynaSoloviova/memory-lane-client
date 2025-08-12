import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] border-t border-[#e8ddc7] text-xs sm:text-sm font-serif">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Left: Project info */}
        <p className="mb-1 sm:mb-0 text-[#8B4513] text-center sm:text-left">
          &copy; {new Date().getFullYear()} Memory Lane. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex gap-3 sm:gap-4">
          <a
            href="https://github.com/yourusername" // <-- replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B4513] hover:text-[#D2691E] transition-colors underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
