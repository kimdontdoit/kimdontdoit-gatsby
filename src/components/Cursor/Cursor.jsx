import React, { useEffect, useState } from "react";
import useCursorPosition from "@kimdontdoit/the-great-gatsby-theme/src/hooks/useCursorPosition";
import "./Cursor.scss";

const Cursor = (props) => {
  const { mouseX, mouseY } = useCursorPosition();
  const { image } = props;

  return (
    <div
      className="cursor fixed"
      style={{
        left: `${mouseX}px`,
        top: `${mouseY}px`,
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
