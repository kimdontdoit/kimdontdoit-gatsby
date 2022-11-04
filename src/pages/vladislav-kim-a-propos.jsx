import React from 'react'
import { graphql } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'

import Seo from 'the-great-gatsby-theme/src/components/Seo'

export default function AboutPage () {
  const { t } = useI18next('index')

  return (
    <>
      <Seo title={t(`about-title`)} />

      <section className={`my-16`}>
        <div className={`container max-w-screen-lg mx-auto`}>
          <h1 className={`text-4xl font-bold`}>{t(`about-title`)}</h1>
        </div>
      </section>

      <section className={`pb-16`}>
        <div className={`container max-w-screen-lg mx-auto`}>
          <p className={`text-lg `}>
            {t(`about-description`)}
          </p>
        </div>
      </section>
    </>
  )
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