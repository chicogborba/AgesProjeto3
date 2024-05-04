import React, { ReactNode } from "react";
import WindowHeader, { WindowHeaderProps } from "./WindowHeader";

interface WindowContainerProps extends WindowHeaderProps {
  children: any;
}

const WindowContainer = ({
  headerTitle,
  headerColor,
  children,
}: WindowContainerProps) => {
  return (
    <div className=" bg-white border-[5px] border-black rounded-lg">
      <WindowHeader headerTitle={headerTitle} headerColor={headerColor} />
      {children}
    </div>
  );
};

export default WindowContainer;