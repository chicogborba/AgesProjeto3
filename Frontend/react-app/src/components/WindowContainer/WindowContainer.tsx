import React, { ReactNode } from "react";
import WindowHeader, { WindowHeaderProps } from "./WindowHeader";

interface WindowContainerProps extends WindowHeaderProps {
  children: ReactNode;
  className?: string;
}

const WindowContainer = ({
  headerTitle,
  headerColor,
  children,
  onClose,
  className,
}: WindowContainerProps) => {
  return (
    <div className={ "bg-white border-[5px] border-black rounded-xl  "}>
      <WindowHeader onClose={onClose} headerTitle={headerTitle} headerColor={headerColor} />
      <div className={className}>
      {children}
      </div>
    </div>
  );
};

export default WindowContainer;