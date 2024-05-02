import { BiCameraMovie } from "react-icons/bi";
import Arrow from "../../../public/arrow.svg";
import Title from "../Title/Title";


const MyMoviesTexts = () => {
  return (
    <div className="ml-8 flex">
      <div className="">
      <div className="flex">
      <Title>MY MOVIES</Title>
      <BiCameraMovie className="ml-4 w-20 h-auto"/>
      </div>
      <p className="font-PublicSans text-3xl max-w-2xl">
        Swipe left to view your watched movies, tap on a poster to discover more about the film and revisit your thoughts from when you watched it.
      </p>
      </div>
      <img className="ml-16" src={Arrow}/>
    </div>
  )
}

export default MyMoviesTexts