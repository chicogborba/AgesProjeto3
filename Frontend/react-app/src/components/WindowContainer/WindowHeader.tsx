import React from "react";

export type Colors = {
  blue: string;
  darkBlue: string;
};

export interface WindowHeaderProps {
  headerTitle: string;
  headerColor: string;
}

const WindowHeader = ({ headerTitle, headerColor }: WindowHeaderProps) => {
  return (
    <div
      className={`py-3 px-1 
    ${headerColor} bg-opacity-75
    flex justify-between items-center
    rounded-t-[0.330rem] 
    border-b-[5px] border-black`}
    >
      <div className="ml-4 font-Jakarta text-lg">{headerTitle}</div>
      <div className="flex">
        <div
          className="
        mr-1 rounded-full
      bg-red-400 w-4 h-4
      border-black border-2"
        />
        <div
          className="
        mr-1 rounded-full 
        bg-yellow-400 w-4 h-4 
        border-black border-2"
        />
        <div
          className="
        mr-1 rounded-full 
        bg-green-400 w-4 h-4 
        border-black border-2"
        />
      </div>
    </div>
  );
};

export default WindowHeader;