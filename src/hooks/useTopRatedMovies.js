import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `/api/tmdb/movie/top_rated?api_key=${apiKey}&page=1`;

      const data = await fetch(url);
      const json = await data.json();
      
      if (json && json.results) {
        dispatch(addTopRatedMovies(json.results));
      }
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
