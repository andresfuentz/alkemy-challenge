//libraries
import React from "react";

// hooks
import { Navigate } from "react-router-dom";

// components
import MovieList from "./MovieList";

const Favs = ({ token, favourites, addOrRemoveFromFavs }) => {
  return (
    <>
      {!token && <Navigate to={"/"} />}
      <div className="row mb-4">
        {favourites.length === 0 ? (
          <h2 className="d-flex justify-content-center mt-3">
            You don't have favs yet!
          </h2>
        ) : (
          <>
            <h2 className="d-flex justify-content-center mt-1">Favs:</h2>
            <MovieList
              movieList={favourites}
              favs={favourites}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Favs;
