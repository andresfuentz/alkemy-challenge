// libraries
import React from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

// hooks
import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

// resources
import poster from "../images/default-movie.jpg";

const Details = ({ token }) => {
  const [movie, setMovie] = useState([]);
  const [searchParams] = useSearchParams();

  let movieID = searchParams.get("id");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US`;
    axios
      .get(endPoint)
      .then((response) => {
        setMovie(response.data);
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
    <>
      {!token && <Navigate to={"/"} />}
      {movie.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <div className="row my-3">
          <div className="col-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = poster;
              }}
              className="w-100"
              alt="movie poster"
            />
          </div>
          <div className="col-8">
            <h1>{movie.title}</h1>
            {movie.genres.map((genre, i) => (
              <small key={i} className="badge bg-secondary me-1">
                {genre.name}
              </small>
            ))}
            <p className="mt-2">{movie.overview}</p>
            <br />
            <strong>Release date:</strong> {movie.release_date}
            <br />
            <strong>Rating:</strong>{" "}
            {movie.vote_average.toString().substring(0, 3)}
            <br />
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
      )}
    </>
  );
};

export default Details;
