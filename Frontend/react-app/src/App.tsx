import TopBar from "./components/TopBar/TopBar"
import FilmCarousel from "./components/FilmCarousel/FilmCarousel"
import MyMoviesTexts from "./components/MyMoviesTexts/MyMoviesTexts"
import Divider from "./components/Divider/Divider"
import AddMovies from "./components/AddMovies/AddMovies"

function App() {

  return (
    <>
    <div className="h-screen w-screen bg-[#FDDA7B] overflow-x-hidden pt-36 pb-36">
      <TopBar/>
      <MyMoviesTexts/>
      <FilmCarousel/>
      <div className="w-screen flex items-center justify-center">
      <Divider className="my-24 w-3/4"/> 
      </div>
      <AddMovies/>
    </div>
    </>
  )
}

export default App
