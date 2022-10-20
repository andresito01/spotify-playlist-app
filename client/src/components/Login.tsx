import React, { useEffect } from "react";
import useAuth from "../useAuth";
import "./styles/Login.css";
const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify&show_dialog=true`;

  return (
    <div className="loginContainer">
      <a href={AUTH_URL}>
        <button>Login With Spotify</button>
      </a>
    </div>
  );
};

export default Login;
