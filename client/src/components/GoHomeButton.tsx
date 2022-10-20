import React from "react";
import { useNavigate } from "react-router-dom";

const GoHomeButton = () => {
  const navigate = useNavigate();
  return (
    <div className="GoHomeButtonContainer">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </button>
    </div>
  );
};

export default GoHomeButton;
