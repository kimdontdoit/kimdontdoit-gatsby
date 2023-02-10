import React, { createContext, useState, useRef } from "react";

const ThemeContext = createContext({
  darkMode: false,
  cursorImage: undefined,
  readingProgress: 0,
  scrollProgressTarget: undefined
});

function ThemeProvider({ children }) {
  const [darkMode, toggleDarkMode] = useState(false);
  const [showCursorImage, setShowCursorImage] = useState(false);
  const [cursorImage, setCursorImage] = useState(undefined);
  const [readingProgress, setReadingProgress] = useState(0);
  const [headerTransparent, setHeaderTransparent] = useState(true);
  const [headerLight, setHeaderLight] = useState(false);

  const scrollProgressTarget = useRef();

  return (
    <ThemeContext.Provider
      value={{
        showCursorImage,
        setShowCursorImage,
        cursorImage,
        setCursorImage,
        scrollProgressTarget,
        readingProgress,
        setReadingProgress,
        darkMode,
        toggleDarkMode,
        headerTransparent,
        setHeaderTransparent,
        headerLight,
        setHeaderLight
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;

export { ThemeProvider };
