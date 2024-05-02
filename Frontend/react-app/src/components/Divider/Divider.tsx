import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <hr className="flex-grow border-black border-t-8 rounded-full"/>
      <span className="px-2 font-extrabold text-7xl">//</span>
      <hr className="flex-grow border-black border-t-8 rounded-full"/>
    </div>
  );
}

export default Divider;