//libraries
import React from "react";
import swAlert from "@sweetalert/with-react";

//hooks
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//components
import Login from "./components/Login";
import List from "./components/List";
import PersonList from "./components/PersonList";
import DirectorList from "./components/DirectorList";
import Details from "./components/Details";
import Results from "./components/Results";
import Favs from "./components/Favs";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const { isLoading } = useAuth0();

  const localData =
    localStorage.getItem("favs") === null
      ? []
      : JSON.parse(localStorage.getItem("favs"));

  const [favourites, setFavourites] = useState(localData);

  const removeMovie = (aMovie) => {
    let arrAux = JSON.parse(localStorage.getItem("favs"));
    const objIndex = arrAux.findIndex((m) => m.id === aMovie.id);

    arrAux.splice(objIndex, 1);

    return arrAux;
  };

  const addOrRemoveFromFavs = (movie) => {
    if (!favourites.some((m) => m.id === movie.id)) {
      setFavourites(favourites.concat(movie));
      swAlert(<h3>"{movie.title}" was added to favs!</h3>);
    } else {
      setFavourites(removeMovie(movie));
      swAlert(<h3>"{movie.title}" was removed from favs!</h3>);
    }
  };

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <>
      <Header favs={favourites} />

      {isLoading ? (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/list"
              element={
                <List
                  favs={favourites}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
            <Route path="/details" element={<Details />} />
            <Route
              path="/castDetails"
              element={
                <PersonList
                  favs={favourites}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
            <Route
              path="/directorDetails"
              element={
                <DirectorList
                  favs={favourites}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
            <Route
              path="/results"
              element={
                <Results
                  favs={favourites}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
            <Route
              path="/favs"
              element={
                <Favs
                  favourites={favourites}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
          </Routes>
        </div>
      )}

      <Footer />
    </>
  );
};

export default App;
