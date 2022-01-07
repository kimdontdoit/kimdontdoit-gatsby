import React from "react";
import { Link, graphql } from "gatsby";

import Seo from "../components/Seo";

const Category = ({ category }) => {
  return (
    <div className="mb-8 text-center">
      <Link className="font-bold" to={category.fields.slug}>
        Catégorie: {category.frontmatter.title}
      </Link>
    </div>
  );
};

export default function CategoriesPage({ data }) {
  const categories = data.categories.nodes;

  return (
    <>
      <Seo title="Catégories" />
      <section className={`my-16`}>
        <header className={`container text-center`}>
          <h1 itemProp="headline" className={`text-4xl font-black`}>
            Catégories
          </h1>
        </header>
      </section>

      <section>
        <div className="container max-w-screen-md text-lg">
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
