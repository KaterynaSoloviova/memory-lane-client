import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] border-t border-[#e8ddc7] text-xs sm:text-sm font-serif">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          {/* Left: Project info */}
          <p className="text-[#8B4513] text-center sm:text-left">
            &copy; {new Date().getFullYear()} Memory Lane. All rights reserved.
          </p>

          {/* Right: Made with love */}
          <div className="flex items-center gap-2 text-[#8B4513]">
            <span className="text-sm sm:text-base">Made with</span>
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#CD853F] fill-current animate-pulse" />
            <span className="text-sm sm:text-base">by</span>
            <span className="font-semibold text-[#CD853F]">Kateryna Soloviova</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
