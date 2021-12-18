import React from "react";
import { Link, graphql } from "gatsby";

import Seo from "../components/Seo";

const Post = ({ post }) => {
  return (
    <div className="mb-8 text-center">
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
      <Seo title="Blogue" />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <section className={`my-16`}>
          <header className={`container text-center`}>
            <h1 itemProp="headline" className={`text-4xl font-black`}>
              Blogue
            </h1>
          </header>
        </section>

        <section>
          {posts &&
            posts.map((post) => {
              return <Post key={post.id} post={post.childMarkdownRemark} />;
            })}
        </section>
      </article>
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
