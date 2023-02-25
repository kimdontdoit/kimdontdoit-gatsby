import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import Seo from "the-great-gatsby-theme/src/components/Seo";

export default function NotFoundPage() {
  const { t } = useI18next("common");

  return (
    <>
      <Seo title="404 Page introuvable 🕵️" />

      <div className="pt-[100px]">
        <section className={`my-16`}>
          <div className={`container text-center`}>
            <h1 className={`text-4xl font-bold`}>{t(`404-title`)}</h1>
          </div>
        </section>

        <section className={`pb-16`}>
          <div className={`container max-w-screen-lg mx-auto`}>
            <p className={`text-lg`}></p>
          </div>
        </section>
      </div>
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
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
