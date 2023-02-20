import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import { useLocation } from "@reach/router";
import classNames from "the-great-gatsby-theme/src/utils/classNames";

import { Tooltip } from "../../Tooltip";

import logoDark from "../../../images/kimdontdoit-logo-2011.png";
import logoLight from "../../../images/kimdontdoit-logo-2011-l.png";
import * as classes from "./Logo.module.css";

export const Logo = ({ sticky, light }) => {
  const { pathname } = useLocation();

  const logo = (
    <img
      alt="Kimdontdoit WAVY logo"
      src={light ? logoLight : logoDark}
      height="69"
      width="151"
      className={classNames(classes.root, sticky && classes.sticky)}
    />
  );

  if (pathname === "/" || pathname === "/en/") {
    return logo;
  }

  return (
    <Tooltip id="logo-tooltip" title="Back to home" bg="#0ea5e9" mt="0.5rem">
      <Link to="/">{logo}</Link>
    </Tooltip>
  );
};
