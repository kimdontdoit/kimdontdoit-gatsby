import React, { useEffect, useState, useContext } from "react";
import { graphql } from "gatsby";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Seo from "the-great-gatsby-theme/src/components/Seo";
import ThemeContext from "../context/ThemeContext";
import { PortfolioPost } from "../components/Post";

import * as classes from "./portfolio.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioTemplate({ data }) {
  const { setHeaderTransparent } = useContext(ThemeContext);
  const [isActive, setActive] = useState();

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, []);

  const { type } = data;
  const posts = data.posts.nodes;

  return (
    <>
      <Seo title={type.frontmatter.title} />
      <div>
        <section className={`container pb-16`}>
          {/* arrow pointing upper right
          <svg width="18px" height="18px" viewBox="0 0 24 24">
            <path d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"></path>
          </svg> 
          */}

          <div className="content">
            <div className={classes.cover}>
              <h1 className={classes.portfolioHeading}>Vladislav Kim</h1>

              <div className={classes.menu}>
                {posts.map((post, index) => {
                  return (
                    <PortfolioPost
                      post={post}
                      index={index}
                      isActive={isActive === index}
                      setActive={setActive}
                      classes={classes} /* @todo */
                    />
                  );
                })}
              </div>
            </div>
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
            color
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
