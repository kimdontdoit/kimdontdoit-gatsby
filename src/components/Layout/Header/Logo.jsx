import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import logoDark from "../../../images/kimdontdoit-logo-2011.png";
import logoLight from "../../../images/kimdontdoit-logo-2011-l.png";

import * as classes from "./Logo.module.css";

export const Logo = ({ light }) => {
  return (
    <Link to="/">
      <img src={light ? logoLight : logoDark} className={classes.root} />
    </Link>
  );
};
