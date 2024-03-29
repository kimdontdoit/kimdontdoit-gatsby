import React, { useMemo } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const Post = ({ node }) => {
    const { language } = useI18next("index");
    const { type, slug, publish_date, category } = node.frontmatter;

    let prepareSlug = type ? `/${type.toLowerCase()}` : ``;
    prepareSlug += `/${slug ?? node.fields.fileName}/`;

    const date = useMemo(() => {
        return language === "fr"
            ? dayjs(publish_date).locale("fr").format("D MMMM YYYY")
            : dayjs(publish_date).locale("en").format("MMMM D, YYYY");
    }, [language, publish_date]);

    return (
        <div className="mb-6 border-b last-of-type:border-0 pb-6 border-zinc-200">
            <Link
                className="text-xl font-display font-bold hover:opacity-80"
                to={prepareSlug}
            >
                {node.frontmatter.title}
            </Link>

            <div className="flex items-center mt-2 font-display">
                <span className="text-sm">{date}</span>
                <div className="text-sm ml-2 rounded-full bg-sky-100 py-1.5 px-3 font-medium text-sky-500">
                    {category}
                </div>
            </div>
        </div>
    );
};
