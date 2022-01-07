---
title: Créer une barre de progrès (scroll) en React
publish_date: 2021-12-31
authors:
  - Vladislav Kim
type: Snippet
category: JavaScript
---

```js
import React, { useState, useEffect } from "react";

import * as classes from "./ScrollProgress.module.scss";

const ScrollProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;

    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop <= element.offsetTop) {
      setReadingProgress(0);
    } else if (false) {
      setReadingProgress(100);
    } else {
      setReadingProgress(
        ((windowScrollTop - element.offsetTop) /
          (element.clientHeight - element.offsetTop - window.innerHeight)) *
          100
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  });

  return (
    <div className={classes.progressContainer}>
      <div
        className={classes.progress}
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export { ScrollProgress };
```
