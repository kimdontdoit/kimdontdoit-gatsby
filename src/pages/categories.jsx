import React from 'react'
import { Link, graphql } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'

import Pageheader from 'the-great-gatsby-theme/src/components/Pageheader'
import Seo from 'the-great-gatsby-theme/src/components/Seo'

const Category = ({ node }) => {
  const { language, defaultLanguage } = useI18next()
  let slug = language !== defaultLanguage ? `/${language}` : ``;
  slug += `/${node.frontmatter.slug ?? node.fields.slug}/`

  return (
    <div className="mb-8">
      <Link className="font-medium" to={slug}>
        {node.frontmatter.title}
      </Link>
    </div>
  )
}

export default function CategoriesPage ({ data }) {
  const { t } = useI18next()

  const categories = data.categories.nodes
  const crumbs = []

  crumbs.push({
    label: t('back-to-home'),
    url: '/',
  })

  return (
    <>
      <Seo title={t('categories')} />

      <section className={`my-16 container`}>
        <Pageheader title={t('categories')} crumbs={crumbs} />
      </section>

      <section className="pb-16 container">
        <div className="max-w-screen-lg mx-auto text-lg">
          {categories &&
            categories.map((category) => {
              return (
                <Category
                  node={category.childMarkdownRemark}
                  key={category.id}
                />
              )
            })}
        </div>
      </section>
    </>
  )
}

export const query = graphql`
    query ($language: String!) {
        categories: allFile(
            filter: {
                sourceInstanceName: { eq: "category" }
                internal: { mediaType: { eq: "text/markdown" } }
                childMarkdownRemark: { fields: { language: { eq: $language } } }
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
                    }
                    fields {
                        language
                        slug
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
`