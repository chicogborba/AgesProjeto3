import React from 'react';

interface CoolButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  size?: Sizes;
}

type Sizes = 'small' | 'normal' | 'smallest' ;

const CoolButton: React.FC<CoolButtonProps> = ({ children, onClick, size, ...props }) => {
    size = size || 'normal';
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
                + ( size === 'normal' ? ' border-8  drop-shadow-retro ' : ( size === 'small' ? ' border-4 drop-shadow-none ' : ' border-4 drop-shadow-none p-4' ))
                + props.className
            }
        >
            {children}
        </div>
    );
}

export default CoolButton;