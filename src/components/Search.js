// libraries
import React from "react";
import swAlert from "@sweetalert/with-react";

// hooks
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      swAlert(<h2>Keyword is empty!</h2>);
    } else if (keyword.length < 4) {
      swAlert(<h2>Keyword must be longer than four characters!</h2>);
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/results?keyword=${keyword}`);
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="keyword"
            placeholder="Search by keyword..."
          />
          <button type="submit" className="btn btn-secondary">
            <BsSearch />
          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
