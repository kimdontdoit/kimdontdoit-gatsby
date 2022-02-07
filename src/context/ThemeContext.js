import React, { createContext, useState, useRef } from "react";

const ThemeContext = createContext({
  cursorImage: undefined,
  readingProgress: 0,
  scrollProgressTarget: undefined,
});

function ThemeProvider({ children }) {
  const [cursorImage, setCursorImage] = useState(undefined);
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollProgressTarget = useRef();

  return (
    <ThemeContext.Provider
      value={{
        cursorImage,
        setCursorImage,
        scrollProgressTarget,
        readingProgress,
        setReadingProgress,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;

export { ThemeProvider };
