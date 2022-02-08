import React from "react";
import { Link } from "gatsby";

import * as classes from "./button.module.scss";

const Button = (props) => {
  const { children, className = "", href } = props;

  const button = href ? (
    <Link to={href} className={`${classes.btn} ${className}`}>
      {children}
    </Link>
  ) : (
    <button className={`${classes.btn} ${className}`}>{children}</button>
  );

  return button;
};

export default Button;
