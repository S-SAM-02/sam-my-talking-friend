import { useState, useEffect } from 'react';

interface SAMAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SAMAvatar = ({ isListening = false, isSpeaking = false, size = 'lg' }: SAMAvatarProps) => {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setPulsePhase(prev => (prev + 1) % 4);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isSpeaking]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const getAnimationClass = () => {
    if (isSpeaking) return 'pulse-glow animate-pulse';
    if (isListening) return 'ai-glow animate-bounce';
    return 'ai-glow';
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-0 rounded-full rainbow-gradient opacity-30 blur-lg ${
          isSpeaking ? 'animate-ping' : ''
        }`}
      />
      
      {/* Main avatar container */}
      <div 
        className={`relative w-full h-full rounded-full bg-gradient-to-br from-primary to-accent border-2 border-primary/50 ${getAnimationClass()}`}
      >
        {/* AI Face/Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-3/4 h-3/4 text-white drop-shadow-lg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM14 10V12H22V10H14ZM14 16V14H22V16H14ZM14 20V18H22V20H14Z"/>
            
            {/* Eyes that blink/react */}
            <circle 
              cx="9" 
              cy="9" 
              r="1.5" 
              fill="white"
              className={isSpeaking ? 'animate-pulse' : ''}
            />
            <circle 
              cx="15" 
              cy="9" 
              r="1.5" 
              fill="white"
              className={isSpeaking ? 'animate-pulse' : ''}
            />
            
            {/* Dynamic mouth based on state */}
            {isSpeaking ? (
              <ellipse 
                cx="12" 
                cy="14" 
                rx="3" 
                ry="1.5" 
                fill="white"
                className="animate-pulse"
              />
            ) : (
              <path 
                d="M9 14 Q12 17 15 14" 
                stroke="white" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* Listening indicator */}
        {isListening && (
          <div className="absolute -inset-2">
            <div className="w-full h-full rounded-full border-2 border-accent animate-ping" />
          </div>
        )}

        {/* Speaking sound waves */}
        {isSpeaking && (
          <div className="absolute -inset-4 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border border-primary/30 animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute w-full h-full rounded-full border border-accent/30 animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute w-full h-full rounded-full border border-primary/30 animate-ping" style={{ animationDelay: '0.6s' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SAMAvatar;