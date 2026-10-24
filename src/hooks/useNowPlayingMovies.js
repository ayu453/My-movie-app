import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const targetUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`;
      const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(targetUrl);

      const data = await fetch(proxyUrl);
      const json = await data.json();
      
      if (json && json.results) {
        dispatch(addNowPlayingMovies(json.results));
      }
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
