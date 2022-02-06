import React, { useContext, useState, useEffect } from "react";

import ThemeContext from "../../context/ThemeContext";

import "./Cursor.scss";

const Cursor = () => {
  const { cursorImage } = useContext(ThemeContext);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return (
    <div
      className="cursor fixed"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorImage && (
        <div className="cursorImage">
          <img src={cursorImage} alt="cursor" />
        </div>
      )}
    </div>
  );
};

export default Cursor;
