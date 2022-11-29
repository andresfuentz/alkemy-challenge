// libraries
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

// hooks
import { Link } from "react-router-dom";

// resources
import poster from "../images/default-movie.jpg";

const MovieList = ({ movieList, favs, addOrRemoveFromFavs }) => {
  return (
    <>
      {movieList.map((movie, i) => {
        return (
          <div className="col-3 mt-4" key={i}>
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = poster;
                }}
                className="card-img-top"
                alt="movie poster"
              />
              <h2 className="d-flex position-absolute top-0 end-0 m-2">
                <BsHeartFill
                  className={`${
                    favs.some((m) => m.id === movie.id)
                      ? "text-danger"
                      : "text-light"
                  }`}
                />
              </h2>
              <h2
                role="button"
                onClick={() => addOrRemoveFromFavs(movie)}
                className="d-flex position-absolute top-0 end-0 m-2"
              >
                <BsHeart className="text-dark" />
              </h2>
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {movie.overview.length < 150
                    ? movie.overview
                    : movie.overview.substring(0, 149) + "..."}
                </p>
              </div>
              <div className="text-center d-grid gap-2 m-2">
                <Link
                  to={`/details?id=${movie.id}`}
                  className="btn btn-secondary"
                >
                  {"[+] More"}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
