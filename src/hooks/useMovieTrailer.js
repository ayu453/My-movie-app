import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMovieTrailer } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      if (!movieId) return;

      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `/api/tmdb/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`;

      const data = await fetch(url);
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
