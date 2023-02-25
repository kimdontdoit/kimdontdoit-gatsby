import React, { useContext, useEffect } from "react";

import { useThemeContext } from "../../context/ThemeContext";

import * as classes from "./ScrollProgress.module.css";

const ScrollProgress = () => {
  const { readingProgress, setReadingProgress, scrollProgressTarget } =
    useThemeContext();

  const scrollListener = () => {
    if (typeof window !== "undefined") {
      const element = scrollProgressTarget.current;

      if (element) {
        const windowScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;

        if (windowScrollTop <= element.offsetTop) {
          setReadingProgress(0);
        } else {
          setReadingProgress(
            ((windowScrollTop - element.offsetTop) /
              (element.clientHeight - element.offsetTop - window.innerHeight)) *
              100
          );
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  });

  if (!scrollProgressTarget?.current) {
    return null;
  }

  return (
    <div className={classes.progressContainer}>
      <div
        className={`${classes.progress}`}
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
