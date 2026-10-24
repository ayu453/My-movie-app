import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      // TMDB URL के आगे CORS Proxy जोड़ना
      const targetUrl = "https://api.themoviedb.org/3/movie/popular?page=1";
      const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

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
