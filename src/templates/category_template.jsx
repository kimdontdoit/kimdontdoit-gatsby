import React from 'react'
import { graphql } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'

import Pageheader from 'the-great-gatsby-theme/src/components/Pageheader'
import Seo from 'the-great-gatsby-theme/src/components/Seo'

import Post from '../components/Post'

export default function CategoryTemplate ({ data }) {
  const { t } = useI18next('index')

  const { category } = data
  const posts = data.posts.nodes
  let crumbs = []

  crumbs.push({
    label: t('categories'),
    url: '/categories',
  })

  return (
    <>
      <Seo
        title={category.frontmatter.title}
        description={category.frontmatter.description || category.excerpt}
      />

      <div>
        <section
          className={`pt-16 container pb-16`}
          style={{
            paddingTop: category.frontmatter.color && '8.5rem',
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
                return <Post key={post.id} node={post.childMarkdownRemark} />
              })}
          </div>
        </section>
      </div>
    </>
  )
}

export const query = graphql`
    query ($id: String!, $title: String, $language: String!) {
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
                childMarkdownRemark: {
                    frontmatter: { category: { eq: $title } }
                    fields: { language: {eq: $language } }
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
`
