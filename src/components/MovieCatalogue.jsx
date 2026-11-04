import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MovieCard from "./MovieCard";
import { API_OPTIONS } from "../utils/constants";

const GENRES = [
  ["All genres", ""], ["Action", "28"], ["Adventure", "12"], ["Animation", "16"],
  ["Comedy", "35"], ["Crime", "80"], ["Documentary", "99"], ["Drama", "18"],
  ["Family", "10751"], ["Fantasy", "14"], ["History", "36"], ["Horror", "27"],
  ["Music", "10402"], ["Mystery", "9648"], ["Romance", "10749"],
  ["Science Fiction", "878"], ["Thriller", "53"], ["War", "10752"], ["Western", "37"]
];

const MovieCatalogue = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("worldwide");
  const [genre, setGenre] = useState("");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    if (submittedQuery.trim()) {
      return `/api/tmdb/search/movie?query=${encodeURIComponent(submittedQuery.trim())}&include_adult=false&language=hi-IN`;
    }
    const params = new URLSearchParams({
      language: "hi-IN",
      include_adult: "false",
      sort_by: "popularity.desc",
      page: String(page),
    });
    if (mode === "hindi-original") params.set("with_original_language", "hi");
    if (genre) params.set("with_genres", genre);
    return `/api/tmdb/discover/movie?${params.toString()}`;
  }, [submittedQuery, mode, genre, page]);

  const loadPage = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error(`Catalogue request failed (${response.status})`);
      const data = await response.json();
      const incoming = Array.isArray(data.results) ? data.results : [];
      setMovies((current) => {
        const base = reset ? [] : current;
        const ids = new Set(base.map((movie) => movie.id));
        return [...base, ...incoming.filter((movie) => movie?.id && !ids.has(movie.id))];
      });
      setTotalPages(Math.min(Number(data.total_pages) || 1, 500));
    } catch (err) {
      setError("Movies could not be loaded. Please try again.");
      console.error("Aflix catalogue error:", err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, loading]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [mode, genre, submittedQuery]);

  useEffect(() => {
    loadPage(page === 1);
  }, [page, endpoint]); // load each selected catalogue page

  const submitSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSubmittedQuery(query.trim());
  };

  const changeMode = (nextMode) => {
    setSubmittedQuery("");
    setQuery("");
    setPage(1);
    setMode(nextMode);
  };

  return (
    <div className="min-h-screen bg-[#090a0b] text-white">
      <Header from="browse" />
      <main className="mx-auto min-h-[75vh] max-w-[1600px] px-5 pb-20 pt-28 md:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="aflux-kicker mb-2">THE WORLD OF CINEMA</div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">All Movies</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Explore worldwide movie releases with Hindi-language titles and descriptions where TMDB provides them.
            </p>
          </div>
          <button onClick={() => navigate("/browse")} className="aflux-ghost">← Back to Discover</button>
        </div>

        <form onSubmit={submitSearch} className="mb-6 flex max-w-2xl gap-2">
          <input value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies from around the world…"
            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm outline-none focus:border-[#c5a66a]" />
          <button type="submit" className="aflux-primary !px-5">Search</button>
        </form>

        <div className="mb-5 flex flex-wrap gap-2">
          <button onClick={() => changeMode("worldwide")} className={`rounded-full border px-4 py-2 text-xs ${mode === "worldwide" ? "border-[#c5a66a] bg-[#c5a66a]/15 text-[#e2c68d]" : "border-white/15 text-white/65"}`}>Worldwide</button>
          <button onClick={() => changeMode("hindi-original")} className={`rounded-full border px-4 py-2 text-xs ${mode === "hindi-original" ? "border-[#c5a66a] bg-[#c5a66a]/15 text-[#e2c68d]" : "border-white/15 text-white/65"}`}>Hindi Original</button>
          <select value={genre} onChange={(event) => { setPage(1); setGenre(event.target.value); }}
            className="rounded-full border border-white/15 bg-[#151617] px-4 py-2 text-xs text-white/80">
            {GENRES.map(([label, value]) => <option key={value || "all"} value={value}>{label}</option>)}
          </select>
        </div>

        <p className="mb-6 max-w-3xl text-xs leading-5 text-white/40">
          Hindi dubbing is not reliably exposed by the TMDB movie catalogue API. A film is not marked “Hindi Dubbed” unless its audio language can be verified from a trustworthy source; Hindi titles or subtitles alone do not prove Hindi audio.
        </p>

        {error && <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error} <button onClick={() => loadPage(true)} className="ml-2 underline">Retry</button></div>}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => <MovieCard key={movie.id} movieId={movie.id} title={movie.title || movie.name}
            posterPath={movie.poster_path} relesed={movie.release_date?.slice(0, 4)} rating={movie.vote_average} />)}
        </div>
        {!loading && !movies.length && !error && <p className="py-20 text-center text-sm text-white/50">No movies found. Try another search or filter.</p>}
        {loading && <p className="py-10 text-center text-sm text-white/50">Loading movies…</p>}
        {!submittedQuery && page < totalPages && <div className="mt-12 text-center">
          <button disabled={loading} onClick={() => setPage((current) => current + 1)} className="aflux-ghost disabled:opacity-40">Load more movies</button>
        </div>}
      </main>
      <Footer />
    </div>
  );
};

export default MovieCatalogue;
