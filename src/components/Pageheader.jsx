import React from "react";

export function Pageheader({ title, subtitle, category, date }) {
  return (
    <header className={`container text-center`}>
      {title && (
        <h1 itemProp="headline" className={`text-4xl font-black`}>
          {title}
        </h1>
      )}

      <div className={`metas`}>
        {subtitle && <p className={`mt-4 opacity-60`}>{subtitle}</p>}

        {category && (
          <p className={`font-bold mt-4 opacity-60`}>Catégorie: {category}</p>
        )}

        {date && <p className={`font-bold mt-4 opacity-60`}>{date}</p>}
      </div>
    </header>
  );
}
