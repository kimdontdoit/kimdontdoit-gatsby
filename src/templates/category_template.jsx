import React, { useEffect, useContext } from "react";
import { Link, graphql } from "gatsby";

import Pageheader from "@kimdontdoit/the-great-gatsby-theme/src/components/Pageheader";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

import ThemeContext from "../context/ThemeContext";

const Post = ({ post }) => {
  return (
    <div className="mb-8">
      <Link className="font-medium" to={post.fields.slug}>
        {post.frontmatter.title}
      </Link>
    </div>
  );
};

export default function CategoryTemplate({ pageContext, data, location }) {
  const { setTopbarTransparent } = useContext(ThemeContext);

  const { category } = data;
  const posts = data.posts.nodes;
  const crumbs = [];

  crumbs.push({
    label: "Catégories",
    url: "/categories",
  });

  useEffect(() => {
    category.frontmatter.color && setTopbarTransparent(true);

    return () => {
      setTopbarTransparent(false);
    };
  });

  return (
    <>
      <Seo
        title={category.frontmatter.title}
        description={category.frontmatter.description || category.excerpt}
      />
      <div>
        <section
          className={`pt-16 container ${category.frontmatter.color && "pb-16"}`}
          style={{
            //backgroundColor: category.frontmatter.color,
            paddingTop: category.frontmatter.color && "8.5rem",
          }}>
          <Pageheader
            title={category.frontmatter.title}
            subtitle={category.frontmatter.subtitle}
            crumbs={crumbs}
            color={category.frontmatter.color}
          />
        </section>

        {category.html && (
          <section className="container">
            <div
              dangerouslySetInnerHTML={{ __html: category.html }}
              itemProp="articleBody"
              className={`max-w-screen-lg mx-auto text-lg`}></div>
          </section>
        )}

        <section className={`container pb-16`}>
          <div className="max-w-screen-lg mx-auto">
            {posts &&
              posts.map((post) => {
                return <Post key={post.id} post={post.childMarkdownRemark} />;
              })}
          </div>
        </section>
      </div>
    </>
  );
}

export const templateQuery = graphql`
  query singleCategory($id: String!, $title: String) {
    category: markdownRemark(id: { eq: $id }) {
      id
      excerpt
      html
      frontmatter {
        title
        subtitle
        color
      }
    }
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "post" }
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
