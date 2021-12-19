import React from "react";
import { Link, graphql } from "gatsby";

import Seo from "../components/Seo";

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
      <Seo title="Articles" />

      <section className={`my-16`}>
        <header className={`container text-center`}>
          <h1 itemProp="headline" className={`text-4xl font-black`}>
            Articles
          </h1>
        </header>
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
  query posts {
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        internal: { mediaType: { eq: "text/markdown" } }
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
