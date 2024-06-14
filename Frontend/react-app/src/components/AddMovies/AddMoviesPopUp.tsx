// src/components/AddMoviesPopUp.tsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import WindowContainer from "../WindowContainer/WindowContainer";
import StarRating from "../StarRating/StarRating";
import CoolButton from "../CoolButton/CoolButton";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMoviesPopUp: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [search , setSearch] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [movieData, setMovieData] = useState<{ Poster?: string , Title?: string, Year?: string}>({});
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [rating, setRating] = useState(5);

  console.log(rating)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed')
      const url = `https://www.omdbapi.com/?t=${search}&apikey=4a3b711b`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data.Poster != undefined) {
            setSearchError(false);
            setMovieData(data);
            setTimeout(() => {
              setIsPostOpen(true);
            }, 600);
            }
          else
          setSearchError(true);
        })
        .catch(error => console.error(error));
    }
  };

  const handleClosePoster = () => {
    setMovieData({});
                setTimeout(() => {
              setIsPostOpen(false);
            }, 600);
    setSearch('');
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-100 transition-transform transform ${isOpen ? 'scale-100' : 'scale-0'}`}>
        <div className=" max-w-96 w-full">
          <WindowContainer 
            headerTitle={"Search Title"} 
            headerColor="bg-[#DFFF9B]" 
            onClose={onClose}
            className="p-6 pb-14"
            >
            <div className="relative ">
              <input
                className="bg-white border-4 rounded-xl w-full p-2 border-black pl-8"
                placeholder="Jaws (1975)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 pointer-events-none">
                <FaSearch />
              </div>
            </div>
            {searchError && <p className="text-slate-500 mt-2 text-sm text-center">Movie not found</p>}
          </WindowContainer>
          <div className={`translate-y-5 -translate-x-8 transition-transform transform ${isPostOpen ? 'visible scale-100' : 'hidden scale-0'}`}>
          <WindowContainer 
            headerTitle={"Post"} 
            headerColor="bg-[#FF9B9B]" 
            onClose={onClose}
            className="p-4 flex-col flex items-center"
            >
            <textarea
            className="bg-white border-4 w-full mb-4 flex-1 rounded-xl p-2 border-black resize-none" // Removendo a capacidade de redimensionamento padrão
            placeholder="Tell us about your experience with the movie..."
            rows={5} // Definindo o número de linhas visíveis
            />
            <StarRating value={rating} onChange={setRating}/>
        <CoolButton size={"smallest"} onClick={() => console.log("bom")} 
        className="w-5/6 text-center text-2xl font-bold font-PublicSans mt-4">
          PUBLISH
        </CoolButton>
          </WindowContainer>
            </div>
        </div>
        <div className={`translate-x-6 transition-transform transform ${Object.keys(movieData).length !== 0 ? ' visible scale-100' : ' hidden scale-0'}`}>
        <WindowContainer 
          headerTitle={"Poster"} 
          headerColor="bg-[#9BC3FF]" 
          onClose={handleClosePoster}
          className={`p-4`}
        >
          <img className="max-h-96 w-auto border-4 rounded-xl border-black" src={movieData.Poster} alt="Movie Poster" />
          <div className="text-center mt-2">
            <p className="font-bold text-xl">{movieData.Title }</p>
          </div>
        </WindowContainer>
        </div>
    </div>
  );
};

export default AddMoviesPopUp;
