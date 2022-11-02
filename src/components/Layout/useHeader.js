import { useState, useEffect } from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";

export const useHeader = () => {
  const { t, languages, language } = useI18next("index");

  console.log(languages);
  console.log(language);

  useEffect(() => {});

  return { t };
};

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
