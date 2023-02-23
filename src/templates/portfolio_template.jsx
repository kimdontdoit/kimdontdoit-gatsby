import React, { useEffect, useContext } from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Seo from "the-great-gatsby-theme/src/components/Seo";
import ThemeContext from "../context/ThemeContext";
import { PortfolioPost } from "../components/Post";

import "./portfolio.css";
gsap.registerPlugin(ScrollTrigger);

export default function PortfolioTemplate({ data }) {
  const { t } = useI18next("index");
  const { setHeaderTransparent } = useContext(ThemeContext);

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, []);

  const { type } = data;
  // const posts = data.posts.nodes;

  const gridItems = [...document.querySelectorAll(".grid > .grid__item")];

  gridItems.forEach((item) => {
    const image = item.querySelector(".grid__item-img");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
      .set(image, {
        transformOrigin: `${gsap.utils.random(0, 1) > 0.5 ? 0 : 100}% 100%`
      })
      .to(image, {
        ease: "none",
        scale: 0
      });
  });

  const posts = [
    "/media/wow-vladislav-kim.jpeg",
    "/media/wow-vladislav-kim.jpeg",
    "/media/wow-vladislav-kim.jpeg",
    "/media/wow-vladislav-kim.jpeg",
    "/media/wow-vladislav-kim.jpeg"
  ];

  let rows = [];
  let columns = [];
  let column;
  let row;

  const portfolioContent = posts.map((post, index) => {
    while (!columns.includes(column)) {
      column = Math.floor(Math.random() * 8) + 1;
      if (!columns.includes(column)) columns.push(column);
    }

    row = index + 1;
    while (!rows.includes(row)) {
      if (!rows.includes(row)) rows.push(row);
    }

    return (
      <div
        className={`grid__item`}
        style={{ "--c": column, "--r": row }}
        key={index}
      >
        <div
          className="grid__item-img"
          style={{
            backgroundImage: `url(/media/wow-vladislav-kim.jpeg)`
          }}
        >
          {row},{column}
        </div>
      </div>
    );
  });

  return (
    <>
      <Seo title={type.frontmatter.title} />
      <div>
        <section className={`container pb-16`}>
          {/*<svg width="18px" height="18px" viewBox="0 0 24 24">
                  <path d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"></path>
  </svg>*/}

          <div className="content">
            <div className="grid">{portfolioContent}</div>

            <div className="cover">
              <h1 className="cover__title font-display">Vladislav Kim</h1>
              <h3 className="cover__subtitle">並外れたファッション</h3>
            </div>

            <div className="footer">
              <p>
                Manifesto: programming is such an interesting turn in our
                history.
              </p>
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
