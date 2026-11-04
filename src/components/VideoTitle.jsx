import React from "react";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const navigate = useNavigate();
  return (
    <div className="aflux-hero-copy">
      <div className="aflux-kicker mb-4">AFLIX ORIGINAL DISCOVERY · FEATURED FILM</div>
      <h1 className="aflux-title mb-5">{title}</h1>
      <p className="text-[#d0cec8] text-sm md:text-base leading-7 max-w-[510px] mb-7 line-clamp-3">{overview}</p>
      <div className="flex flex-wrap gap-3">
        <button className="aflux-primary" onClick={() => navigate(`/watch?v=${movieId}`)}>▶ &nbsp; Watch now</button>
        <button className="aflux-ghost" onClick={() => navigate(`/watch?v=${movieId}`)}>Explore film &nbsp; ↗</button>
      </div>
    </div>
  );
};
export default VideoTitle;
