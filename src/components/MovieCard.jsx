import React, { useState } from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import PlayerModal from './PlayerModal';

const MovieCard = ({ posterPath, movieId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!posterPath) return null;

  return (
    <>
      <div 
        className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-105 transition duration-200"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          alt="Movie Poster" 
          src={IMG_CDN_URL + posterPath} 
          className="rounded-lg"
        />
      </div>

      {/* Movie Click hone par Player Modal Khulega */}
      {isPlaying && (
        <PlayerModal 
          movieId={movieId} 
          onClose={() => setIsPlaying(false)} 
        />
      )}
    </>
  );
};

export default MovieCard;
