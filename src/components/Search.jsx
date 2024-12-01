import Enter from "./Enter";
import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ setPayload }) => {
  const [textInput, setTextInput] = useState("");

  const handleEnter = async (e) => {
    e.preventDefault();
    if (textInput.trim() === "") {
      return;
    }
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${textInput.trim()}`
    );
    const respObj = await response.json();
    setPayload(respObj);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTextInput(value);
    }
  };

  return (
    <div className="searchContainer">
      <form className="search" onSubmit={handleEnter}>
        <input
          type="search"
          className="searchInput"
          placeholder="Type the product's barcode..."
          value={textInput}
          onChange={handleInputChange}
        />

        <div className="searchButton" onClick={handleEnter}>
          <FaSearch className="searchIcon" />
        </div>
      </form>
    </div>
  );
};
export default Search;
