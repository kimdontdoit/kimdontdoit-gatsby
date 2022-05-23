import React from "react";
import { Link } from "gatsby";
// import dayjs from "dayjs";
// import "dayjs/locale/fr";

const Post = (props) => {
  /*const date = dayjs(post.frontmatter.publish_date)
      .locale("fr")
      .format("D MMMM YYYY");*/
  const { post } = props;

  return (
    <div className="pb-8">
      <div className="text-sm font-medium mb-2">
        {post.frontmatter.category && <span>{post.frontmatter.category}</span>}
        {post.frontmatter.type && <span>{post.frontmatter.type}</span>}
      </div>

      <Link className="font-bold text-2xl mb-2" to={post.fields.slug}>
        {post.frontmatter.title}
      </Link>

      <Link className="font-bold text-base" to={post.fields.slug}>
        Lire la suite
      </Link>
    </div>
  );
};
export default Post;
