import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      // v3 API Key ko seedhe URL mein query parameter ki tarah bhejna
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const targetUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`;
      const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

      const data = await fetch(proxyUrl);
      const json = await data.json();
      
      if (json && json.results) {
        dispatch(addPopularMovies(json.results));
      }
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
