import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const pages = await Promise.all(Array.from({ length: 5 }, (_, i) =>
          fetch(`/api/tmdb/discover/movie?api_key=${apiKey}&language=hi-IN&with_original_language=hi&sort_by=popularity.desc&page=${i + 1}`).then(r => r.json())
        ));
        const movies = pages.flatMap(p => p?.results || []);
        if (active) dispatch(addPopularMovies(movies));
      } catch (error) { console.error("Failed to load popular Hindi movies:", error); }
    };
    load();
    return () => { active = false; };
  }, [dispatch]);
};
export default usePopularMovies;