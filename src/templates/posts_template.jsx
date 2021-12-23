import React from "react";
import { Link, graphql } from "gatsby";

import { Pageheader } from "../components/Pageheader";
import Seo from "../components/Seo";

export default function PostTemplate({ data, location }) {
  const post = data.markdownRemark;
  //const { previous, next } = data;

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <section className={`my-16`}>
          <Pageheader
            title={post.frontmatter.title}
            date={post.frontmatter.publish_date}
          />
        </section>

        <section className="pb-16">
          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className={`container max-w-screen-md text-lg`}
          ></div>
        </section>
      </article>
    </>
  );
}

export const templateQuery = graphql`
  query postById($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        publish_date(formatString: "MMMM DD, YYYY")
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
