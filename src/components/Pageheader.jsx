import React from "react";

export function Pageheader({ title, date }) {
  return (
    <header className={`container text-center`}>
      {title && (
        <h1 itemProp="headline" className={`text-4xl font-black`}>
          {title}
        </h1>
      )}

      {date && <p>{date}</p>}
    </header>
  );
}
