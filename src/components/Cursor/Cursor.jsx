import React, { useContext, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import ThemeContext from "../../context/ThemeContext";

import "./Cursor.css";

const Cursor = () => {
  const { cursorImage, showCursorImage, setCursorImage } =
    useContext(ThemeContext);

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
      setCursorImage(undefined);
    };
  }, []);

  return (
    <CSSTransition
      unmountOnExit
      in={showCursorImage}
      timeout={{ appear: 0, enter: 0, exit: 300 }}
      classNames="roll"
      appear
    >
      <div
        className="cursor fixed"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursorImage" key="cursor-image">
          <img src={cursorImage} alt="cursor" />
        </div>{" "}
      </div>
    </CSSTransition>
  );
};

export default Cursor;
