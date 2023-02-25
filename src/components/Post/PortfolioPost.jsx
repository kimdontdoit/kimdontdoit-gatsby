import React from "react";

export const PortfolioPost = ({
  post,
  index,
  isActive,
  setActive,
  classes
}) => {
  const styles = {
    "--post-color": `#${post.childMarkdownRemark.frontmatter.color}`
  };

  return (
    <div
      className={`${classes.portfolioItem} ${isActive ? classes.current : ""}`}
      style={styles}
      onClick={() => setActive(index)}
    >
      <span className={classes.number}>{`0${index + 1}`}</span>

      <span className={classes.textwrap}>
        <span className={classes.text}>
          {post.childMarkdownRemark.frontmatter.title}
        </span>
      </span>

      <a className={classes.link}>more details soon</a>
    </div>
  );
};
