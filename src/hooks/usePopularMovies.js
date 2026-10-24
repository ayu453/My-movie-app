import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `/api/tmdb/movie/popular?api_key=${apiKey}&page=1`;

      const data = await fetch(url);
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
