import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies?.length) return null;
  const mainMovie = movies[1] || movies[0];
  const { original_title, title, overview, id } = mainMovie;
  return (
    <div className="aflux-hero">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title || title} overview={overview} movieId={id} />
      <div className="absolute bottom-7 right-8 z-10 hidden md:block text-[10px] tracking-[.25em] text-white/50">AFLIX · CINEMA, REIMAGINED</div>
    </div>
  );
};
export default MainContainer;