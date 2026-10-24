import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Watch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const movieId = searchParams.get("v");

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ position: "absolute", top: "20px", left: "20px", background: "red", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", zIndex: 50 }}
      >
        ← Back
      </button>

      {movieId ? (
        <iframe
          src={`https://vidsrc.to/embed/movie/${movieId}`}
          title="Movie Player"
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        ></iframe>
      ) : (
        <div style={{ color: "white", textAlign: "center" }}>
          <h1>Movie Not Found!</h1>
          <button onClick={() => navigate("/browse")} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
}
