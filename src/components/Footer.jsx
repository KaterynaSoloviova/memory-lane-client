import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FCF0D9] to-[#FCF0D9] border-t border-[#e8ddc7] text-xs sm:text-sm font-serif">
      <div className="w-full px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-5">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          {/* Left corner: Memory Lane copyright */}
          <div className="text-center sm:text-left sm:ml-0">
            <p className="text-[#8B4513] font-medium">
              &copy; {new Date().getFullYear()} Memory Lane. All rights reserved.
            </p>
          </div>

          {/* Right corner: Made with love */}
          <div className="flex items-center justify-center sm:justify-end sm:mr-0 gap-2 text-[#8B4513]">
            <span className="text-xs sm:text-sm">Made with</span>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#CD853F] fill-current animate-pulse" />
            <span className="text-xs sm:text-sm">by</span>
            <span className="font-semibold text-[#CD853F] text-xs sm:text-sm">Kateryna Soloviova</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
