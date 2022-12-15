// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import MovieList from "./MovieList";

const List = ({ favs, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&sort_by=popularity.desc&page=1`;
    axios
      .get(endPoint)
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((err) => {
        swAlert(
          <>
            <h2>An error has occurred</h2>
            {console.log(err.message)}
          </>
        );
      });
  });

  return (
    <div className="row mb-4">
      {!isAuthenticated ? (
        <Navigate to={"/"} />
      ) : movieList.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <>
          <h2 className="d-flex justify-content-center mt-2">
            <div className="badge rounded-pill text-bg-light">Popular</div>
          </h2>
          <MovieList
            movieList={movieList}
            favs={favs}
            addOrRemoveFromFavs={addOrRemoveFromFavs}
          />
        </>
      )}
    </div>
  );
};

export default List;
