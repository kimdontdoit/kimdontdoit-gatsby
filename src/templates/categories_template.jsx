import React from "react";
import { Link, graphql } from "gatsby";

import { Pageheader } from "../components/Pageheader";
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

export default function CategoryTemplate({ data, location }) {
  const { category, next, previous } = data;
  const posts = data.posts.nodes;

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

        <section className={`pb-16`}>
          {posts &&
            posts.map((post) => {
              return <Post key={post.id} post={post.childMarkdownRemark} />;
            })}
        </section>
      </div>
    </>
  );
}

export const templateQuery = graphql`
  query singleCategory(
    $id: String!
    $previousPostId: String
    $nextPostId: String
    $title: String
  ) {
    category: markdownRemark(id: { eq: $id }) {
      id
      excerpt
      html
      frontmatter {
        title
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
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "posts" }
        internal: { mediaType: { eq: "text/markdown" } }
        childMarkdownRemark: { frontmatter: { category: { eq: $title } } }
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
