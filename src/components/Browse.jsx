import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GeminiSearch from "./GeminiSearch";
import Footer from "./Footer";

const Browse = () => {
  const showGeminiSearch = useSelector((store) => store.gemini.isGeminiSearchEnable);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <section><Header from="browse" /></section>
      {showGeminiSearch ? <GeminiSearch /> : <>
        <section className="top-0 z-[-1] w-full"><MainContainer /></section>
        <section><SecondaryContainer /></section>
      </>}
      <section><Footer /></section>
    </div>
  );
};
export default Browse;
