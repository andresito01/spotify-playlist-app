import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/HomeScreen.css";
// @ts-ignore
import useAuth from "../useAuth"
import Login from "../components/Login.js";
//import LockImage from "../images/lock.png";
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

const HomeScreen = ({ code }: {code: any}) => {

  const accessToken: any = useAuth({code})
  
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const getUser = () => {
     // Get the authenticated user
    spotifyApi.getMe()
    .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
    }, function(err) {
    console.log('Something went wrong!', err);
});
  }

  return (
    <div className="homeScreen">
      <div className="headerContainer">
        <h1 className="header">Automated Spotify Playlist Maker</h1>
      </div>
      <div className="menuContainer">
        <div className="option purple">
          <h3 className="optionTitle" onClick={getUser}>Genre</h3>
        </div>
        <div className="option blue">
          <h3 className="optionTitle">Artists</h3>
        </div>
        <div className="option yellow">
          <h3 className="optionTitle">Empty</h3>
        </div>
        <div className="option green">
          <h3 className="optionTitle">Empty</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
