import React from "react";
import { Link } from "gatsby";

export function Pageheader({ title, subtitle, crumbs, date, center }) {
  return (
    <header className={`container ${center ? "text-center" : ""}`}>
      {title && (
        <h1 itemProp="headline" className={`text-4xl font-black`}>
          {title}
        </h1>
      )}

      {crumbs && (
        <div className={`crumbs font-bold opacity-60 mt-4`}>
          {crumbs.map((val, index) => {
            const isLast = index === crumbs.length - 1;

            if (isLast) {
              return <Link to={val.url}>{val.label}</Link>;
            }

            return (
              <>
                <Link to={val.url}>{val.label}</Link>;<span> / </span>
              </>
            );
          })}
        </div>
      )}
      <div className={`metas`}>
        {subtitle && <p className={`mt-4 opacity-60`}>{subtitle}</p>}

        {date && (
          <p className={`font-bold mt-4 opacity-60`}>Publié le {date}</p>
        )}
      </div>
    </header>
  );
}
