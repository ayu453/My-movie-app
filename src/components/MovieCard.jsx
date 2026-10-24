import React, { useState } from 'react';
import PlayerModal from './PlayerModal';

const MovieCard = ({ posterPath, movieId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!posterPath) return null;

  // TMDB Image Base URL
  const imgCdnUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div 
        className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-105 transition duration-200"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          alt="Movie Poster" 
          src={imgCdnUrl + posterPath} 
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
