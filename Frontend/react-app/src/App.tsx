import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieReview from './pages/MovieReview';
import TopBar from './components/TopBar/TopBar';

function App() {

  return (
    <div>
      <TopBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/movie/:movieId/:reviewId" element={<MovieReview/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
