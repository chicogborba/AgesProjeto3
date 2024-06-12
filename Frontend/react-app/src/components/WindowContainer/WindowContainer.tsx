import React, { ReactNode } from "react";
import WindowHeader, { WindowHeaderProps } from "./WindowHeader";

interface WindowContainerProps extends WindowHeaderProps {
  children: ReactNode;
}

const WindowContainer = ({
  headerTitle,
  headerColor,
  children,
  onClose,
}: WindowContainerProps) => {
  return (
    <div className=" bg-white border-[5px] border-black rounded-xl">
      <WindowHeader onClose={onClose} headerTitle={headerTitle} headerColor={headerColor} />
      {children}
    </div>
  );
};

export default WindowContainer;