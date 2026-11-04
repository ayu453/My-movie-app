import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const pages = await Promise.all(Array.from({ length: 5 }, (_, i) =>
          fetch(`/api/tmdb/discover/movie?api_key=${apiKey}&language=hi-IN&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=20&page=${i + 1}`).then(r => r.json())
        ));
        const movies = pages.flatMap(p => p?.results || []);
        if (active) dispatch(addTopRatedMovies(movies));
      } catch (error) { console.error("Failed to load top rated Hindi movies:", error); }
    };
    load();
    return () => { active = false; };
  }, [dispatch]);
};
export default useTopRatedMovies;