import React from 'react';

interface CoolButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  size?: Sizes;
}

type Sizes = 'small' | 'normal' ;

const CoolButton: React.FC<CoolButtonProps> = ({ children, onClick, size, ...props }) => {
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
            className={"p-4 border-black rounded-3xl bg-[#FFEDAB] hover:scale-105 hover:cursor-pointer hover:drop-shadow-none transition-all " 
                + ( size === 'small' ? ' border-4 drop-shadow-retroSM ' : ' border-8  drop-shadow-retro ')
                + props.className
            }
        >
            {children}
        </div>
    );
}

export default CoolButton;