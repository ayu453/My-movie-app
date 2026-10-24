import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      // AllOrigins Proxy (बेहद तेज़ और बिना ब्लॉक होने वाली प्रॉक्सी)
      const targetUrl = "https://api.themoviedb.org/3/movie/popular?page=1";
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

      const data = await fetch(proxyUrl, API_OPTIONS);
      const json = await data.json();
      
      if (json.results) {
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
