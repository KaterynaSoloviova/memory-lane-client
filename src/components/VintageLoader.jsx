import { Heart, Clock } from 'lucide-react';
import { VintageOrnament } from '../utils/vintageStyles';

const VintageLoader = ({ 
  size = 'md', 
  message = 'Preserving memories...', 
  className = '',
  showMessage = true 
}) => {
  // Size variants
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'w-8 h-8',
      text: 'text-lg',
      ornament: 'sm'
    },
    md: {
      container: 'py-12',
      icon: 'w-12 h-12',
      text: 'text-xl',
      ornament: 'md'
    },
    lg: {
      container: 'py-16',
      icon: 'w-16 h-16',
      text: 'text-2xl',
      ornament: 'lg'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`text-center ${currentSize.container} ${className}`}>
      {/* Animated vintage elements */}
      <div className="relative flex justify-center items-center mb-6">
        {/* Rotating ornamental hearts */}
        <div className="absolute">
          <Heart 
            className={`${currentSize.icon} text-[#CD853F] animate-spin opacity-30`}
            style={{ animationDuration: '3s' }}
          />
        </div>
        <div className="absolute">
          <Heart 
            className={`${currentSize.icon} text-[#D2691E] animate-spin opacity-40`}
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          />
        </div>
        
        {/* Central clock icon with pulse */}
        <Clock 
          className={`${currentSize.icon} text-[#8B4513] animate-pulse z-10`}
          style={{ animationDuration: '1.5s' }}
        />
      </div>

      {/* Animated ornament */}
      <div className="animate-pulse" style={{ animationDuration: '2s' }}>
        <VintageOrnament size={currentSize.ornament} symbol="✦" />
      </div>

      {/* Loading message */}
      {showMessage && (
        <p 
          className={`${currentSize.text} font-semibold text-[#8B4513] animate-pulse italic`}
          style={{ 
            fontFamily: 'Georgia, serif',
            animationDuration: '1.8s'
          }}
        >
          {message}
        </p>
      )}

      {/* Animated dots */}
      <div className="flex justify-center items-center mt-4 gap-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-[#CD853F] rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VintageLoader;
