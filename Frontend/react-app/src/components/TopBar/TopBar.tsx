
import { IoMenu } from "react-icons/io5";
import StyledContainer from "../StyledContainer/StyledContainer";

const TopBar = () => {
  return (
    <div className="w-screen h-16 fixed top-0 bg-[#FDFD96] border-b-4 border-black
     flex flex-row justify-between overflow-visible z-50
     px-4 items-center">
      <div className="flex items-center flex-row-reverse">
        <StyledContainer className="p-2 translate-y-8 translate-x-[-1rem] pl-4">
          @ChicoGBorba
        </StyledContainer>
        <img className=" translate-y-8 rounded-full border-4 border-black h-28 w-28" src="https://i.imgur.com/ryW7EFL.png"/>
      </div>
        <IoMenu className="h-12 w-auto hover:cursor-pointer hover:scale-110 transition-all  "/>
    </div>
  );
}

export default TopBar;
