import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, SuggestionPage }) => {
  if (!movies?.length) return null;
  return (
    <section className="aflux-section">
      <div className="flex items-end justify-between mb-3">
        <div><div className="aflux-kicker mb-1">CURATED FOR YOUR NEXT WATCH</div><h2 className="aflux-section-title">{title}</h2></div>
        <span className="text-xs text-[#777873] hidden sm:block">Discover more →</span>
      </div>
      <div className={SuggestionPage ? "" : "overflow-x-auto scrollbar-hide"}>
        <div className={SuggestionPage ? "flex flex-wrap gap-5" : "flex gap-4 md:gap-5 py-3"}>
          {movies.map((movie) => <MovieCard key={movie?.id} movieId={movie?.id} title={movie?.title || movie?.name} posterPath={movie?.poster_path} relesed={movie?.release_date ? movie.release_date.slice(0,4) : ""} rating={movie?.vote_average} />)}
        </div>
      </div>
    </section>
  );
};
export default MovieList;