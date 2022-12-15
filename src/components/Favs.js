//libraries
import React from "react";

// hooks
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import MovieList from "./MovieList";

const Favs = ({ favourites, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && <Navigate to={"/"} />}
      <div className="row mb-4">
        {favourites.length === 0 ? (
          <h2 className="d-flex justify-content-center mt-3">
            You don't have favs!
          </h2>
        ) : (
          <>
            <h2 className="d-flex justify-content-center mt-2">
              <div className="badge rounded-pill text-bg-danger">Favs</div>
            </h2>
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
