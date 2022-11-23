import React from "react";
import {Link} from 'gatsby-plugin-react-i18next';

import classNames from "the-great-gatsby-theme/src/utils/classNames";

import * as classes from "./Pageheader.module.css";

const Crumbs = ({ crumbs }) => {
  return (
    <div className={`${classes.crumbs}`}>
      {crumbs.map((val, index) => {
        const isLast = index === crumbs.length - 1;

        if (isLast) {
          return (
            <Link key={index} to={val.url}>
              {val.label}
            </Link>
          );
        }

        return (
          <>
            <Link key={index} to={val.url}>
              {val.label}
            </Link>
            <span> / </span>
          </>
        );
      })}
    </div>
  );
};

export default function Pageheader({
  center,
  title,
  subtitle,
  crumbs,
  children,
  color,
}) {
  /*let textColor = "000000";
  if (color) {
    textColor = colorBasedOnBg(color, "#FFFFFF", "#000000");
  }*/

  return (
    <header
      className={classNames(
        "md:max-w-screen-lg",
        "mx-auto",
        center ? "text-center" : ""
      )}
      //style={{ color: textColor }}
    >
      {crumbs && <Crumbs crumbs={crumbs} />}

      {title && (
        <h1 itemProp="headline" className={`${classes.headline}`}>
          {title}
        </h1>
      )}

      <div>
        {subtitle && <p className={`${classes.subtitle}`}>{subtitle}</p>}

        {children}
      </div>
    </header>
  );
}
