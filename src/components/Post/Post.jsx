import React from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const Post = ({ node }) => {
  const { t, language } = useI18next("index");
  const { type, slug, publish_date, category } = node.frontmatter;

  let prepareSlug = type ? `/${type.toLowerCase()}` : ``;
  prepareSlug += `/${slug ?? node.fields.slug}/`;

  const date =
    language === "fr"
      ? dayjs(publish_date).locale("fr").format("D MMMM YYYY")
      : dayjs(publish_date).locale("en").format("MMMM D, YYYY");

  return (
    <div className="mb-4 border-b pb-4 border-zinc-200">
      <Link
        className="text-xl font-display font-bold hover:opacity-80"
        to={prepareSlug}
      >
        {node.frontmatter.title}
      </Link>

      <div className="mt-2 text-sm font-display">
        {date}{" "}
        <div class="inline text-xs ml-2 rounded-full bg-slate-200 py-1.5 px-3 font-medium text-slate-500">
          {category}
        </div>
      </div>
    </div>
  );
};
