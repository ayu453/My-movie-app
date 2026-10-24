import React from "react";
import { useNavigate } from "react-router-dom";
import { Img_CDN_Url } from "../utils/constants"; // <--- Yahan 'Img_CDN_Url' bilkul waise hi likhna hai jaisa constants.js me hai

const MovieCard = ({ posterPath, movieId }) => {
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleCardClick = () => {
    if (movieId) {
      navigate(`/watch?v=${movieId}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0"
    >
      <img 
        alt="Movie Poster" 
        src={Img_CDN_Url + posterPath} 
        className="rounded-lg w-full h-auto object-cover" 
      />
    </div>
  );
};

export default MovieCard;
