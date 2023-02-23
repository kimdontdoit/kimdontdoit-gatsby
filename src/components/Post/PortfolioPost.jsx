import React from "react";
import { Link } from "gatsby-plugin-react-i18next";

export const PortfolioPost = ({ node }) => {
  let slug = node.frontmatter.type
    ? `/${node.frontmatter.type.toLowerCase()}`
    : ``;
  slug += `/${node.frontmatter.slug ?? node.fields.slug}/`;

  return (
    <div className="mb-8">
      <span className="font-medium">{node.frontmatter.title}</span>
    </div>
  );
};
