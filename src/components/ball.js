import React from "react";

const Ball = ({ hit }) => {
  return (
    <div className="ball" onClick={hit} onTouchStart={hit}>
      <svg
        style={{ position: "absolute", top: "95px", left: "400px" }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="red"
          stroke-width="2"
          fill="red"
        />
      </svg>
    </div>
  );
};

export default Ball;
