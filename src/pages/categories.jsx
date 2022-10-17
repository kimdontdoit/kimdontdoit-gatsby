import React from "react";
import { Link, graphql } from "gatsby";

import Pageheader from "@kimdontdoit/the-great-gatsby-theme/src/components/Pageheader";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

const Category = ({ category }) => {
  return (
    <div className="mb-8">
      <Link className="font-bold" to={`${category.fields.slug}`}>
        {category.frontmatter.title}
      </Link>
    </div>
  );
};

export default function CategoriesPage({ data }) {
  const categories = data.categories.nodes;
  const crumbs = [];

  crumbs.push({
    label: "Retour à l'accueil",
    url: "/",
  });

  return (
    <>
      <Seo title="Catégories" />

      <section className={`my-16 container`}>
        <Pageheader title="Catégories" crumbs={crumbs} />
      </section>

      <section className="pb-16 container">
        <div className="max-w-screen-lg mx-auto text-lg">
          {categories &&
            categories.map((category) => {
              return (
                <Category
                  category={category.childMarkdownRemark}
                  key={category.id}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}

export const pageQuery = graphql`
  query categories {
    categories: allFile(
      filter: {
        sourceInstanceName: { eq: "category" }
        internal: { mediaType: { eq: "text/markdown" } }
        childMarkdownRemark: { fields: { language: { eq: "fr" } } }
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
            language
            slug
          }
        }
      }
    }
  }
`;
