import React, { useMemo } from "react";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const WpPost = (props) => {
    const { post } = props;

    const title = post.title;

    const date = dayjs(post.modifiedGmt).format("MMMM D, YYYY");

    return (
        <div className="mb-6 p-3 bg-white rounded-xl">
            <div className="font-display font-bold hover:opacity-80">
                {title}
            </div>
            <span className="text-sm">{date}</span>
        </div>
    );
};
