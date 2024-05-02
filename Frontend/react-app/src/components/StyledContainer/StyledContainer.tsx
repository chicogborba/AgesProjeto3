

const StyledContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={"bg-white rounded-xl border-4 border-black drop-shadow-retroSM " + className}>
      {children}
    </div>
  );
}

export default StyledContainer;