import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TopBar from "./components/TopBar/TopBar"
import FilmCarousel from "./components/FilmCarousel/FilmCarousel"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="h-screen w-screen bg-[#FDDA7B] overflow-x-hidden">
      <TopBar/>
      <FilmCarousel/>
    </div>
    </>
  )
}

export default App
