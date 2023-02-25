import React from "react";
import { Link } from "gatsby-plugin-react-i18next";

import classNames from "the-great-gatsby-theme/src/utils/classNames";

const Crumbs = ({ crumbs }) => {
  return (
    <div className={`font-display font-medium mb-4`}>
      {crumbs.map((val, index) => {
        const isLast = index === crumbs.length - 1;

        if (isLast) {
          return (
            <div className="inline" key={index}>
              <Link key={index} to={val.url}>
                {val.label}
              </Link>
            </div>
          );
        }

        return (
          <div className="inline" key={index}>
            <Link to={val.url}>{val.label}</Link>
            <span> / </span>
          </div>
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
  color
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
        <h1
          itemProp="headline"
          className={`font-display text-4xl md:text-6xl leading-tight md:leading-tight font-bold`}
        >
          {title}
        </h1>
      )}

      <div>
        {subtitle && (
          <p className={`text-lg mt-4 text-slate-800 md:whitespace-pre-line`}>
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </header>
  );
}
