import React from "react";
import { graphql } from "gatsby";

import { Pageheader } from "../components/Pageheader";
import Seo from "../components/Seo";

export default function CategoryTemplate({ data, location }) {
  const category = data.markdownRemark;

  return (
    <>
      <Seo
        title={category.frontmatter.title}
        description={category.frontmatter.description || category.excerpt}
      />
      <div>
        <section className={`my-16`}>
          <Pageheader title={category.frontmatter.title} />
        </section>

        {category.html && (
          <section>
            <div
              dangerouslySetInnerHTML={{ __html: category.html }}
              itemProp="articleBody"
              className={`container max-w-screen-md text-lg`}
            ></div>
          </section>
        )}
      </div>
    </>
  );
}

export const templateQuery = graphql`
  query categoryById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
        date(formatString: "MMMM DD, YYYY")
        description
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
