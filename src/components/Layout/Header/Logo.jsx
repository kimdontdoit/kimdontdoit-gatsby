import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import logoDark from "../../../images/kimdontdoit-logo-2011.png";
import logoLight from "../../../images/kimdontdoit-logo-2011-l.png";

import * as classes from "./Logo.module.css";

export const Logo = ({ light }) => {
  return (
    <Link to="/">
      <img alt="Kimdontdoit WAVY logo" src={light ? logoLight : logoDark} height="69" width="151" className={classes.root} />
    </Link>
  );
};
