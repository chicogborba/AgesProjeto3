import { useParams } from "react-router-dom";
import Title from "../components/Title/Title";
import WindowContainer from "../components/WindowContainer/WindowContainer";


const MovieReview = () => {
  const {movieId, reviewId} = useParams();

  return (
    <div>
      <div className="h-screen w-screen bg-[#FDDA7B] pt-36 pb-36 flex justify-center items-center"> 
      <div className="flex">
      <Title>Tubarão, 2004</Title>
      <WindowContainer headerTitle={"Review"}  headerColor="bg-[#DFFF9B]" > 
      Texto do review
      </WindowContainer>
      <WindowContainer headerTitle={"Poster"}  headerColor="bg-[#9BC3FF]" > 
      <img src="https://i.pinimg.com/originals/09/40/9e/09409ee8f8235de402120bd8a4ceb1a9.jpg" 
      className="border-4 border-black h-full mb-8 max-h-96 w-auto"/>
      </WindowContainer>
      <WindowContainer headerTitle={"Nota"}  headerColor="bg-[#FF9B9B]" > 
      5/5
      </WindowContainer>
      <WindowContainer headerTitle={"Dados"}  headerColor="bg-[#FFDD9B]" > 
      filme de 2002 e os krl
      </WindowContainer>
      </div>
      </div>
    </div>
  )
}

export default MovieReview;
