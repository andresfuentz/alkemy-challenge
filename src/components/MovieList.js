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
          <div className="col-sm-6 col-md-4 col-lg-3 mt-2" key={i}>
            <div
              className={`card h-100 ${favs !== undefined &&
                favs.some((m) => m.id === movie.id) &&
                "border-danger border-opacity-25"}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = poster;
                }}
                className="card-img-top"
                alt="movie poster"
              />
              <h1 className="d-flex position-absolute top-0 end-0 m-2">
                <BsHeartFill
                  className={`${
                    favs !== undefined && favs.some((m) => m.id === movie.id)
                      ? "text-danger"
                      : "text-light"
                  }`}
                />
              </h1>
              <h1
                role="button"
                onClick={() => addOrRemoveFromFavs(movie)}
                className="d-flex position-absolute top-0 end-0 m-2"
              >
                <BsHeart className="text-dark" />
              </h1>
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
                  className={`btn ${
                    favs !== undefined && favs.some((m) => m.id === movie.id)
                      ? "btn-danger"
                      : "btn-secondary"
                  }`}
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
