import { Heart } from 'lucide-react';

// Vintage styling utility functions and components
export const vintageColors = {
  primary: '#8B4513',
  secondary: '#CD853F', 
  tertiary: '#D2691E',
  accent: '#A0522D',
  background: {
    main: 'bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1]',
    card: 'bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec]',
    section: 'bg-gradient-to-r from-[#f4e8d6] via-[#f0e2d0] to-[#ecdcc8]'
  }
};

export const vintageClasses = {
  pageContainer: 'min-h-screen bg-gradient-to-br from-[#f9f5f0] via-[#f5ede3] to-[#f0e4d1] relative overflow-hidden font-serif',
  decorativeElements: 'absolute inset-0 opacity-[0.03]',
  card: 'bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-[2rem] shadow-2xl border-8 border-[#e8d5b7]',
  button: {
    primary: 'bg-gradient-to-r from-[#CD853F] to-[#D2691E] hover:from-[#D2691E] hover:to-[#CD853F] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#8B4513]',
    secondary: 'bg-gradient-to-r from-[#fefcf8] to-[#f8f3ec] border-3 border-[#CD853F] text-[#8B4513] hover:bg-gradient-to-r hover:from-[#CD853F] hover:to-[#D2691E] hover:text-white px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
  },
  text: {
    primary: 'text-[#8B4513]',
    secondary: 'text-[#A0522D]',
    accent: 'text-[#CD853F]'
  }
};

// Decorative background elements component
export const VintageDecorations = () => (
  <>
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
      <Heart className="absolute top-10 left-10 w-24 h-24 rotate-6" color="#8B4513" />
      <Heart className="absolute top-20 left-32 w-40 h-40 rotate-12" color="#8B4513" />
      <Heart className="absolute top-40 left-60 w-20 h-20 -rotate-10" color="#CD853F" />
      <Heart className="absolute top-64 right-20 w-28 h-28 -rotate-6" color="#CD853F" />
      <Heart className="absolute top-80 right-40 w-36 h-36 rotate-20" color="#D2691E" />
      <Heart className="absolute bottom-20 left-20 w-20 h-20 rotate-30" color="#D2691E" />
      <Heart className="absolute bottom-40 left-1/4 w-24 h-24 rotate-45" color="#D2691E" />
      <Heart className="absolute bottom-10 right-1/3 w-24 h-24 -rotate-15" color="#A0522D" />
      <Heart className="absolute top-1/3 left-1/2 w-36 h-36 -rotate-12" color="#A0522D" />
      <Heart className="absolute bottom-20 right-1/4 w-20 h-20 rotate-30" color="#8B4513" />
      <Heart className="absolute bottom-64 right-10 w-16 h-16 rotate-45" color="#A0522D" />
      <Heart className="absolute top-72 left-1/5 w-20 h-20 rotate-5" color="#CD853F" />
    </div>
  </>
);


// Ornamental divider component
export const VintageOrnament = ({ size = 'md', symbol = '❦' }) => {
  const lineWidth = size === 'lg' ? 'w-20' : size === 'sm' ? 'w-12' : 'w-16';
  const symbolSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl';
  
  return (
    <div className="flex justify-center items-center mb-6">
      <div className={`${lineWidth} h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent`}></div>
      <span className={`${symbolSize} mx-4 text-[#CD853F]`}>{symbol}</span>
      <div className={`${lineWidth} h-px bg-gradient-to-r from-transparent via-[#CD853F] to-transparent`}></div>
    </div>
  );
};

// Vintage container wrapper
export const VintageContainer = ({ children, className = '', padding = 'p-6' }) => (
  <div className={`relative bg-gradient-to-br from-[#fefcf8] via-[#fdf9f4] to-[#f8f3ec] rounded-[2rem] shadow-2xl border-8 border-[#e8d5b7] ${padding} ${className}`}>
    {/* Decorative corner elements */}
    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#CD853F] rounded-tl-lg"></div>
    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#CD853F] rounded-tr-lg"></div>
    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#CD853F] rounded-bl-lg"></div>
    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#CD853F] rounded-br-lg"></div>
    {children}
  </div>
);
