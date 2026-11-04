import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        // Hindi is the display language only. No original-language filter:
        // films from every country and language remain discoverable.
        const pages = await Promise.all(
          Array.from({ length: 10 }, (_, index) =>
            fetch(`/api/tmdb/movie/upcoming?api_key=${apiKey}&language=hi-IN&page=${index + 1}`)
              .then((response) => {
                if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
                return response.json();
              })
          )
        );
        const seen = new Set();
        const movies = pages.flatMap((page) => page?.results || []).filter((movie) => {
          if (!movie?.id || seen.has(movie.id)) return false;
          seen.add(movie.id);
          return true;
        });
        if (active) dispatch(addUpcomingMovies(movies));
      } catch (error) {
        console.error("Unable to load worldwide movies:", error);
      }
    };
    load();
    return () => { active = false; };
  }, [dispatch]);
};

export default useUpcomingMovies;
