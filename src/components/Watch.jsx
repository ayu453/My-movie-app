import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { API_OPTIONS, Img_CDN_Url } from "../utils/constants";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = searchParams.get("v");
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState([]);
  const [watchLink, setWatchLink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!movieId) { setLoading(false); return; }
      setLoading(true);
      try {
        const [movieResponse, providerResponse] = await Promise.all([
          fetch(`/api/tmdb/movie/${encodeURIComponent(movieId)}?language=hi-IN`, API_OPTIONS),
          fetch(`/api/tmdb/movie/${encodeURIComponent(movieId)}/watch/providers`, API_OPTIONS)
        ]);
        if (!movieResponse.ok) throw new Error("Movie details unavailable");
        const movieData = await movieResponse.json();
        const providerData = providerResponse.ok ? await providerResponse.json() : {};
        if (!active) return;
        setMovie(movieData);
        const india = providerData?.results?.IN || {};
        setWatchLink(india.link || `https://www.themoviedb.org/movie/${movieId}/watch?locale=IN`);
        setProviders([...(india.flatrate || []), ...(india.free || []), ...(india.ads || []), ...(india.rent || []), ...(india.buy || [])]
          .filter((provider, index, list) => list.findIndex((item) => item.provider_id === provider.provider_id) === index));
      } catch (error) {
        console.error("Unable to load official watch options:", error);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [movieId]);

  return (
    <div className="min-h-screen bg-[#080909] text-white">
      <Header from="browse" />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-28 md:px-10">
        <button onClick={() => navigate(-1)} className="mb-8 text-sm text-white/65 hover:text-white">← Back</button>
        {!movieId ? <p className="py-20 text-center">Movie not found.</p> : loading ? <p className="py-20 text-center text-white/60">Loading movie details…</p> : movie ? (
          <div className="grid gap-8 md:grid-cols-[260px_1fr]">
            <div>{movie.poster_path && <img src={Img_CDN_Url + movie.poster_path} alt={movie.title || "Movie poster"} className="w-full rounded-xl shadow-2xl" />}</div>
            <div className="pt-2">
              <div className="aflux-kicker mb-3">AFLIX · OFFICIAL WATCH OPTIONS</div>
              <h1 className="mb-4 text-3xl font-semibold md:text-5xl">{movie.title}</h1>
              <p className="mb-5 max-w-3xl text-sm leading-7 text-white/60">{movie.overview || "No description is available for this title."}</p>
              <div className="mb-8 flex flex-wrap gap-3 text-xs text-white/55">
                {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
                {movie.vote_average > 0 && <span>★ {Number(movie.vote_average).toFixed(1)}</span>}
                {movie.runtime > 0 && <span>{movie.runtime} min</span>}
              </div>
              <h2 className="mb-3 text-xl font-medium">Where to watch in India</h2>
              {providers.length ? (
                <div className="mb-5 flex flex-wrap gap-3">
                  {providers.map((provider) => <a key={provider.provider_id} href={watchLink} target="_blank" rel="noreferrer"
                    className="flex min-w-32 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 hover:border-[#c5a66a]/60">
                    {provider.logo_path && <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt="" className="h-10 w-10 rounded-lg" />}
                    <span className="text-sm">{provider.provider_name}</span>
                  </a>)}
                </div>
              ) : <p className="mb-5 text-sm text-white/55">No India streaming provider is currently listed for this title.</p>}
              <a href={watchLink} target="_blank" rel="noreferrer" className="aflux-primary inline-flex">View official watch options ↗</a>
              <p className="mt-4 max-w-2xl text-xs leading-5 text-white/35">Streaming availability and audio languages can vary by region and subscription. Aflix only displays provider information; it does not host or relay copyrighted movie streams.</p>
            </div>
          </div>
        ) : <p className="py-20 text-center text-white/60">Movie details could not be loaded.</p>}
      </main>
    </div>
  );
}
