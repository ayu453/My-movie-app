import React from "react";
import { useNavigate } from "react-router-dom";
import { Img_CDN_Url } from "../utils/constants";

const MovieCard = ({ posterPath, movieId, title, relesed, rating }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;
  return (
    <button type="button" onClick={() => movieId && navigate(`/watch?v=${movieId}`)} className="aflux-card group text-left" aria-label={`Watch ${title || "movie"}`}>
      <div className="relative overflow-hidden rounded-xl">
        <img alt={title || "Movie poster"} src={Img_CDN_Url + posterPath} loading="lazy" className="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
          {relesed ? <span>{relesed}</span> : <span> AFLIX PICK </span>}
          {rating ? <span className="text-[#e3c17d]">★ {Number(rating).toFixed(1)}</span> : null}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100"><span className="rounded-full border border-white/70 bg-black/50 px-4 py-2 text-xs tracking-widest text-white">VIEW FILM ↗</span></div>
      </div>
      <div className="aflux-card-title mt-3 line-clamp-1">{title || "Untitled film"}</div>
    </button>
  );
};
export default MovieCard;