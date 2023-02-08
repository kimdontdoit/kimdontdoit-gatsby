import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import logoDark from "../../../images/kimdontdoit-logo-2011.png";
import logoLight from "../../../images/kimdontdoit-logo-2011-l.png";

import * as classes from "./Logo.module.css";

export const Logo = ({ sticky, light }) => {
  return (
    <Link to="/">
      <img
        alt="Kimdontdoit WAVY logo"
        src={light ? logoLight : logoDark}
        height="69"
        width="151"
        className={classNames(classes.root, sticky && classes.sticky)}
      />
    </Link>
  );
};
