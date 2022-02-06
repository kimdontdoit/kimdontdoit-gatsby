import React, { useState, useEffect } from "react";

import "./Cursor.scss";

const Cursor = (props) => {
  const { image } = props;

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  });

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    console.log(e.clientX + ", " + e.clientY);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="cursor fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {image && (
        <div className="cursorImage">
          <img src={image} alt="cursor" />
        </div>
      )}
    </div>
  );
};

export default Cursor;
