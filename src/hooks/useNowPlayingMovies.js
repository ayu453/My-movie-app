import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      // Direct TMDB URL ko CORS Proxy ke zariye bhejna
      const targetUrl = "https://api.themoviedb.org/3/movie/now_playing?page=1";
      const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

      const data = await fetch(proxyUrl, API_OPTIONS);
      const json = await data.json();
      
      if (json.results) {
        dispatch(addNowPlayingMovies(json.results));
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
