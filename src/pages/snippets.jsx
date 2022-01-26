import React from "react";
import { Link, graphql } from "gatsby";

import Pageheader from "@kimdontdoit/the-great-gatsby-theme/src/components/Pageheader";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

const Post = ({ post }) => {
  return (
    <div className="container mb-8 text-center">
      <Link className="font-bold" to={post.fields.slug}>
        Article: {post.frontmatter.title}
      </Link>
    </div>
  );
};

export default function Blogue({ data, location }) {
  const posts = data.posts.nodes;

  return (
    <>
      <Seo title="Snippets" />

      <section className={`my-16`}>
        <Pageheader title="Snippets" center={true} />
      </section>

      <section className={`pb-16`}>
        {posts &&
          posts.map((post) => {
            return <Post key={post.id} post={post.childMarkdownRemark} />;
          })}
      </section>
    </>
  );
}

export const pageQuery = graphql`
  query snippets {
    posts: allFile(
      sort: {
        fields: childrenMarkdownRemark___frontmatter___publish_date
        order: DESC
      }
      filter: {
        sourceInstanceName: { eq: "post" }
        internal: { mediaType: { eq: "text/markdown" } }
        childMarkdownRemark: { frontmatter: { type: { eq: "Snippet" } } }
      }
    ) {
      nodes {
        id
        sourceInstanceName
        childMarkdownRemark {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
