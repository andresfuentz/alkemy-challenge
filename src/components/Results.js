// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

// components
import MovieList from "./MovieList";

const Results = ({ favs, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();

  const [movieResults, setMovieResults] = useState([]);
  const [countResults, setCountResults] = useState();
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChanges, setPageChanges] = useState();
  const [loadedResults, setLoadedResults] = useState();

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
        setCountResults(response.data.total_results);
        setPages(response.data.total_pages);
        setCurrentPage(1);
        setPageChanges(0);
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
    window.scrollTo(0, 0);
  }, [keyword]);

  useEffect(() => {
    if (pageChanges > 0) {
      setMovieResults([]);
      setLoadedResults(false);

      const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&query=${keyword}&page=${currentPage}`;

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
    }
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePreviousPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
    setPageChanges(pageChanges + 1);
  };

  const handleNextPage = () => {
    currentPage < pages && setCurrentPage(currentPage + 1);
    setPageChanges(pageChanges + 1);
  };

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
            <h2 className="d-flex justify-content-center mt-3">
              <div className="badge rounded-pill border-bottom border-dark border-opacity-25 text-bg-light">
                {countResults} results to {`"${keyword}"`}
              </div>
            </h2>
            <MovieList
              movieList={movieResults}
              favs={favs}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
            <div className="row mx-0 p-2">
              <div className="col d-flex justify-content-start p-0">
                <span
                  className={`border rounded border-dark border-opacity-25 text-bg-light ${currentPage ===
                    1 && "d-none"}`}
                  role={currentPage !== 1 ? "button" : ""}
                  onClick={() => handlePreviousPage()}
                >
                  <BsArrowLeft className="mx-4 my-2" />
                </span>
              </div>
              <div className="col d-flex justify-content-center">
                <small className="user-select-none my-2">
                  Page {currentPage}/{pages}
                </small>
              </div>
              <div className="col d-flex justify-content-end p-0">
                <span
                  className={`border rounded border-dark border-opacity-25 text-bg-light ${currentPage ===
                    pages && "d-none"}`}
                  role="button"
                  onClick={() => handleNextPage()}
                >
                  <BsArrowRight className="mx-4 my-2" />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Results;
