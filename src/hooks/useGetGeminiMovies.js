import React from "react";
import Gemini from "../utils/gemini-config";
import { addGeminiMovieResults } from "../utils/geminiSlice";

export const useGetGeminiMovies = async (searchText, searchDisabled, setSearchDisabled, dispatch, setErr) => {
  try {
    if (searchText.current.value.trim() == "") {
      setErr("Enter Something!!");
      return;
    }

    if (searchDisabled) return;

    setSearchDisabled(true);

    setTimeout(() => {
      setSearchDisabled(false);
    }, 12000);

    const findMovie = async (movieName) => {
      // v3 API Key URL parameters me pass ki hai aur CORS Proxy wrap kiya hai
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const targetUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
      const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(targetUrl);

      const movie = await fetch(proxyUrl);
      const json = await movie.json();
      return json.results;
    };

    setErr("");
    const model = Gemini;
    const prompt =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 28 to 50 movies comma seperated like the example given ahead. Example result : Gadar,Sholay,Don,Golmaal, Koi Mil Gaya.";

    const result = await model.generateContent(prompt);
    const movieNames = result.response
      .text()
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const promiseArray = movieNames.map((movie) => findMovie(movie));
    const foundMovies = await Promise.all(promiseArray);
    let movies = foundMovies.map((resultsList) => resultsList && resultsList[0]).filter((movie) => movie !== undefined);

    const filteredMovies = movies;

    dispatch(addGeminiMovieResults(filteredMovies));
  } catch (error) {
    console.error("Gemini error:", error);
    setErr("Something went wrong! Please try again.");
  }
};
