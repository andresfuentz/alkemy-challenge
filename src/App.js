//libraries
import React from "react";
import swAlert from "@sweetalert/with-react";

//hooks
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

//components
import Login from "./components/Login";
import List from "./components/List";
import Details from "./components/Details";
import Results from "./components/Results";
import Favs from "./components/Favs";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [token, setToken] = useState("");

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
      <Header token={token} favs={favourites} />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/list"
            element={
              <List
                token={token}
                favs={favourites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          />
          <Route path="/details" element={<Details token={token} />} />
          <Route
            path="/results"
            element={
              <Results
                token={token}
                favs={favourites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          />
          <Route
            path="/favs"
            element={
              <Favs
                token={token}
                favourites={favourites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
