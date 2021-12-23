import React from "react";

export function Pageheader({ title, subtitle, date }) {
  return (
    <header className={`container text-center`}>
      {title && (
        <h1 itemProp="headline" className={`text-4xl font-black`}>
          {title}
        </h1>
      )}

      {subtitle && <p className={`mt-2`}>{subtitle}</p>}

      {date && <p className={`mt-2`}>{date}</p>}
    </header>
  );
}
