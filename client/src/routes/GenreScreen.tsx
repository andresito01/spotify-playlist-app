import React, { useState } from "react";
import axios from "axios";
import OptionScreenHeader from "../components/OptionScreenHeader.js";
import "./styles/GenreScreen.css";
const GenreScreen = ({ code }: {code: any}) => {
  return (
    <div className="genreScreen">
      <OptionScreenHeader />
      <div className="headerContainer">
        <h1 className="header">Genre Page</h1>
      </div>
      <div className="playlistContainer">
        <button>Get Playlists</button>
        <div className="playlistList"></div>
      </div>
    </div>
  );
};

export default GenreScreen;
