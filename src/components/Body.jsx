import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Watch from "./Watch";
import MovieCatalogue from "./MovieCatalogue";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Browse /> },
    { path: "/browse", element: <Browse /> },
    { path: "/movies", element: <MovieCatalogue /> },
    { path: "/watch", element: <Watch /> },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
