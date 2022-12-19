// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

// resources
import poster from "../images/default-movie.jpg";

const Details = ({ favs, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [searchParams] = useSearchParams();

  let movieID = searchParams.get("id");

  useEffect(() => {
    const movieEndPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US`;
    const creditsEndPoint = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US`;

    axios
      .all([axios.get(movieEndPoint), axios.get(creditsEndPoint)])
      .then(
        axios.spread((movieResp, creditsResp) => {
          setMovie(movieResp.data);
          setCredits(creditsResp.data);
        })
      )
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
    <>
      {!isAuthenticated && <Navigate to={"/"} />}
      {movie.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <div className="row mb-4">
          {window.innerWidth > 767 && (
            <div className="col-4">
              <div className="position-relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = poster;
                  }}
                  className="w-100 p-2"
                  alt="movie poster"
                />
                <h1 className="d-flex position-absolute top-0 end-0 p-2 m-2">
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
                  className="d-flex position-absolute top-0 end-0 p-2 m-2"
                >
                  <BsHeart className="text-dark" />
                </h1>
              </div>
            </div>
          )}

          <div className={window.innerWidth > 767 ? "col-8" : "col-auto"}>
            <h1 className="mt-2">
              {movie.title}
              {movie.release_date.length > 0 &&
                " (" + movie.release_date.substring(0, 4) + ")"}
            </h1>
            {movie.genres.map((genre, i) => (
              <small key={i} className="badge bg-secondary me-1">
                {genre.name}
              </small>
            ))}
            {window.innerWidth < 768 && (
              <div className="position-relative mt-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = poster;
                  }}
                  className="w-100 p-2"
                  alt="movie poster"
                />
                <h1 className="d-flex position-absolute top-0 end-0 p-2 m-2">
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
                  className="d-flex position-absolute top-0 end-0 p-2 m-2"
                >
                  <BsHeart className="text-dark" />
                </h1>
              </div>
            )}
            <p className="mt-2">{movie.overview}</p>
            <div className="mt-4">
              <strong>Director: </strong>
              {credits.crew.map(
                (member) =>
                  member.job === "Director" && (
                    <Link
                      key={member.id}
                      to={`/directorDetails?id=${member.id}&name=${member.name}`}
                    >
                      <button
                        type="button"
                        className="badge rounded-pill text-bg-light me-1"
                      >
                        {member.name}
                      </button>
                    </Link>
                  )
              )}
            </div>
            <div className="mt-2">
              <strong>Cast: </strong>
              {credits.cast.map(
                (member, i) =>
                  i < 5 && (
                    <Link
                      key={member.id}
                      to={`/castDetails?id=${member.id}&name=${member.name}`}
                    >
                      <button
                        type="button"
                        className="badge rounded-pill text-bg-light me-1"
                      >
                        {member.name}
                      </button>
                    </Link>
                  )
              )}
            </div>
            <div className="mt-2">
              <strong>Release date:</strong>{" "}
              {movie.release_date.replace(/-/g, "/")}
            </div>
            <div className="mt-1">
              <strong>Rating:</strong>{" "}
              {movie.vote_average < 1
                ? "Not rated"
                : movie.vote_average.toString().substring(0, 3)}
            </div>
            <div className="mt-1">
              <strong>
                Language{movie.spoken_languages.length > 1 && "s"}:
              </strong>{" "}
              {movie.spoken_languages.map((lang, i) => (
                <span key={i}>
                  {lang.english_name.split(";")[0]}
                  {i + 1 === movie.spoken_languages.length ? "." : ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
