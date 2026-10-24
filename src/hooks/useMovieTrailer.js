import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      if (!movieId) return;

      // v3 API Key + CORS Proxy
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const targetUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`;
      const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

      const data = await fetch(proxyUrl);
      const json = await data.json();

      if (json && json.results) {
        const filteredData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filteredData.length ? filteredData[0] : json.results[0];
        dispatch(addMovieTrailer(trailer));
      }
    } catch (error) {
      console.error("Failed to fetch movie trailer:", error);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
