import React from 'react';

interface CoolButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
}

const CoolButton: React.FC<CoolButtonProps> = ({ children, onClick, ...props }) => {
    return (
        <div 
        {...props}
            role="button" 
            tabIndex={0} 
            onClick={onClick} 
            onKeyPress={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    onClick();
                }
            }} 
            className={"p-4 border-black border-8 drop-shadow-retro rounded-3xl bg-[#FFEDAB] hover:scale-105 hover:cursor-pointer hover:drop-shadow-none transition-all " + props.className }
        >
            {children}
        </div>
    );
}

export default CoolButton;