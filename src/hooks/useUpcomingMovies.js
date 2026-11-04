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
        const pages = await Promise.all(Array.from({ length: 5 }, (_, i) =>
          fetch(`/api/tmdb/discover/movie?api_key=${apiKey}&language=hi-IN&with_original_language=hi&sort_by=release_date.desc&include_adult=false&page=${i + 1}`).then(r => r.json())
        ));
        const movies = pages.flatMap(p => p?.results || []);
        if (active) dispatch(addUpcomingMovies(movies));
      } catch (error) { console.error("Failed to load latest Hindi movies:", error); }
    };
    load();
    return () => { active = false; };
  }, [dispatch]);
};
export default useUpcomingMovies;