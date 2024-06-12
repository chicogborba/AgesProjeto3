import { useState } from "react";
import CoolButton from "../CoolButton/CoolButton";
import Title from "../Title/Title";
import AddMoviesPopUp from "./AddMoviesPopUp";


const AddMovies = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-col items-center text-center">
      <div>
      <Title>NEW MOVIE?</Title>
      <p className="font-PublicSans text-3xl max-w-2xl">
      Share your thoughts on the latest film you've watched by creating a new post  
      </p>
      </div>
    <CoolButton onClick={() => setIsOpen(true)} className="mt-16 w-fit text-5xl font-bold font-PublicSans">ADD MOVIE</CoolButton>
    </div>
    <AddMoviesPopUp isOpen={isOpen} onClose={() => setIsOpen(false)}  />
    </>
  );
}

export default AddMovies;