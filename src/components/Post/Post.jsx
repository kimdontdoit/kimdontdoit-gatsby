import React from "react";
import { Link } from "gatsby-plugin-react-i18next";

const Post = ({ node }) => {
  let slug = node.frontmatter.type
    ? `/${node.frontmatter.type.toLowerCase()}`
    : ``;
  slug += `/${node.frontmatter.slug ?? node.fields.slug}/`;

  return (
    <div className="mb-8">
      <Link className="font-medium" to={slug}>
        {node.frontmatter.title}
      </Link>
    </div>
  );
};

export default Post;
