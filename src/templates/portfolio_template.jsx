import React, { useEffect, useContext } from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import Pageheader from "the-great-gatsby-theme/src/components/Pageheader";
import Seo from "the-great-gatsby-theme/src/components/Seo";
import ThemeContext from "../context/ThemeContext";

import { PortfolioPost } from "../components/Post";

export default function PortfolioTemplate({ data }) {
  const { t } = useI18next("index");
  const { setHeaderTransparent } = useContext(ThemeContext);

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, []);

  const { type } = data;
  const posts = data.posts.nodes;

  const crumbs = [];

  crumbs.push({
    label: t("back-to-home"),
    url: "/"
  });

  return (
    <>
      <Seo title={type.frontmatter.title} />
      <div>
        <section className={`my-24 container`}>
          <h1>{type.frontmatter.title}</h1>
        </section>

        <section className={`container pb-16`}>
          <div className="max-w-screen-lg mx-auto">
            {posts &&
              posts.map((post) => {
                return (
                  <PortfolioPost
                    key={post.id}
                    node={post.childMarkdownRemark}
                  />
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}

export const query = graphql`
  query singleType($id: String!, $title: String, $language: String!) {
    type: markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "post" }
        childMarkdownRemark: {
          frontmatter: { type: { eq: $title } }
          fields: { language: { eq: $language } }
        }
      }
    ) {
      nodes {
        id
        sourceInstanceName
        childMarkdownRemark {
          id
          frontmatter {
            title
            slug
            type
          }
          fields {
            slug
            language
          }
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
