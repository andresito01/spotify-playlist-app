import React from "react";
import Login from "./Login.js";
import GoHomeButton from "./GoHomeButton.js";
import "./styles/OptionScreenHeader.css";

const OptionScreenHeader = () => {
  return (
    <div className="OptionScreenHeaderContainer">
      <GoHomeButton />
      <Login />
    </div>
  );
};

export default OptionScreenHeader;
