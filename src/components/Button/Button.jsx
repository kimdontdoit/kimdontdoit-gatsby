import React from "react";
import { Link } from "gatsby";

import * as classes from "./button.module.css";

const Button = (props) => {
  const { children, onClick, className = "", href } = props;

  const button = href ? (
    <Link to={href} className={`${classes.btn} ${className}`}>
      {children}
    </Link>
  ) : onClick ? (
    <button onClick={onClick} className={`${classes.btn} ${className}`}>
      {children}
    </button>
  ) : (
    <button className={`${classes.btn} ${className}`}>{children}</button>
  );

  return button;
};

export default Button;
