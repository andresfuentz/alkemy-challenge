// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import MovieList from "./MovieList";

const Results = ({ favs, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();
  const [loadedResults, setLoadedResults] = useState();
  const [movieResults, setMovieResults] = useState([]);
  const [searchParams] = useSearchParams();

  let keyword = searchParams.get("keyword");

  useEffect(() => {
    setMovieResults([]);
    setLoadedResults(false);

    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&query=${keyword}&page=1`;

    axios
      .get(endPoint)
      .then((response) => {
        setMovieResults(response.data.results);
        setLoadedResults(true);
      })
      .catch((err) => {
        swAlert(
          <>
            <h2>An error has occurred</h2>
            {console.log(err.message)}
          </>
        );
      });
  }, [keyword]);

  return (
    <>
      {!isAuthenticated && <Navigate to={"/"} />}
      <div className="row mb-4">
        {movieResults.length === 0 ? (
          !loadedResults ? (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          ) : (
            <h2 className="d-flex justify-content-center mt-3">
              No results to {`"${keyword}"`}.
            </h2>
          )
        ) : (
          <>
            <h2 className="d-flex justify-content-center mt-2">
              <div className="badge rounded-pill text-bg-light">
                Results to {`"${keyword}"`}
              </div>
            </h2>
            <MovieList
              movieList={movieResults}
              favs={favs}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Results;
