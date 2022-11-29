// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// components
import MovieList from "./MovieList";

const List = ({ token, favs, addOrRemoveFromFavs }) => {
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
      {!token ? (
        <Navigate to={"/"} />
      ) : movieList.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <MovieList
          movieList={movieList}
          favs={favs}
          addOrRemoveFromFavs={addOrRemoveFromFavs}
        />
      )}
    </div>
  );
};

export default List;
