import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Seo from "../components/Seo";

export default function PostTemplate({ data, location }) {
  const post = data.markdownRemark;
  //const { previous, next } = data;

  const image = getImage(post.frontmatter.featuredImage);

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <section className={`my-16`}>
          <header className={`container text-center`}>
            {image && <GatsbyImage image={image} />}

            <h1 itemProp="headline" className={`text-4xl font-black`}>
              {post.frontmatter.title}
            </h1>
            <p>{post.frontmatter.date}</p>
          </header>
        </section>

        <section>
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
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
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
