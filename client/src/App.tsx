import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomeScreen from "./routes/HomeScreen";
import Login from "./components/Login";
import GenreScreen from "./routes/GenreScreen.js";

const code: any = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="App">{code ? <HomeScreen code={code} /> : <Login />}</div>
  );
}

export default App;
