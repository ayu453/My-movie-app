import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = searchParams.get("v"); // URL से tmdb movieId मिलेगी

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition z-50"
      >
        ← Back
      </button>

      {movieId ? (
        <iframe
          src={`https://vidsrc.to/embed/movie/${movieId}`}
          title="Movie Player"
          className="w-full h-full border-none"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Movie ID Not Found!</h1>
          <button
            onClick={() => navigate("/browse")}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Watch;
