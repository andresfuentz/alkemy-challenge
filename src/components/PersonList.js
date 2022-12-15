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

const PersonList = ({ favs, addOrRemoveFromFavs }) => {
  const { isAuthenticated } = useAuth0();
  const [personList, setPersonList] = useState([]);
  const [searchParams] = useSearchParams();

  let personID = searchParams.get("id");
  let personName = searchParams.get("name");

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US`;
    axios
      .get(endPoint)
      .then((response) => {
        setPersonList(response.data.cast);
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
      ) : personList.length === 0 ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <>
          <h2 className="d-flex justify-content-center mt-1">
            <div className="badge rounded-pill text-bg-light">
              {personName} filmography
            </div>
          </h2>
          <MovieList
            movieList={personList}
            favs={favs}
            addOrRemoveFromFavs={addOrRemoveFromFavs}
          />
        </>
      )}
    </div>
  );
};

export default PersonList;
