import React from 'react';
import { Layers } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`text-primary ${className}`}>
      <Layers className="w-full h-full" />
    </div>
  );
};

export default Logo;