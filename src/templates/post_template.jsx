import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'
import dayjs from 'dayjs'
import "dayjs/locale/fr";

import Pageheader from 'the-great-gatsby-theme/src/components/Pageheader'
import Seo from 'the-great-gatsby-theme/src/components/Seo'

import ThemeContext from '../context/ThemeContext'
import Notice from '../components/Notice'
import * as classes from './posts_template.module.css'

export default function PostTemplate ({ data }) {
  const { t, language } = useI18next('index')

  const { post, type } = data
  const { scrollProgressTarget } = useContext(ThemeContext)

  const { title, description, publish_date, needs_update } = post.frontmatter

  // TODO verify and dynamically change language in locale()
  // TODO add category

  const date = language === 'fr' ?
    dayjs(publish_date).locale('fr').format('D MMMM YYYY')
    :
    dayjs(publish_date).locale('en').format('MMMM D, YYYY')

  const shortDate = language === 'fr' ?
    dayjs(publish_date).locale('fr').format('D MMM YYYY')
    :
    dayjs(publish_date).locale('en').format('MMM D, YYYY')

  const crumbs = []

  if (type) {
    crumbs.push({
      label: `${t(`all-the`)} ${type.frontmatter.title}`,
      url: type.fields.slug,
    })
  }

  return (
    <>
      <Seo title={title} description={description || post.excerpt} />

      <article
        itemScope
        itemType="http://schema.org/Article"
        ref={scrollProgressTarget}>
        <section className={`my-16 container`}>
          <Pageheader title={title} center={true} crumbs={crumbs}>
            {shortDate && (
              <p className={`font-medium mt-4 opacity-69`}>
                {shortDate}
                {post.timeToRead > 1 && ` • ${post.timeToRead} min. de lecture`}
              </p>
            )}
          </Pageheader>
        </section>

        {needs_update && <Notice />}

        <section className="pb-16 container flex">
          <div className={`${classes.content} flex-1`}>
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
              className={`md:max-w-screen-lg mx-auto text-lg`}></div>

            <div className="md:max-w-screen-lg mx-auto">
              {date && (
                <p className={`font-medium mt-4 mb-0 opacity-69`}>
                  {`${t('published-on')} ${date}`}
                </p>
              )}

              <p className={`font-medium opacity-69`}>
                {`${t(`published-by`)} Vladislav Kim`}
              </p>
            </div>
          </div>

          {/*post.tableOfContents && (
            <div className={`${classes.toc}`}>
              <h3 className={`text-lg font-bold mb-4`}>Table des matières</h3>
              <div
                dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
              ></div>
            </div>
          )*/}
        </section>
      </article>
    </>
  )
}

export const query = graphql`
    query postById(
        $id: String!
        $category: String!
        $type: String!
        $previousPostId: String
        $nextPostId: String
        $language: String!
    ) {
        post: markdownRemark(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                publish_date
                type
                needs_update
            }
            tableOfContents
            timeToRead
            wordCount {
                paragraphs
                sentences
                words
            }
        }
        category: markdownRemark(frontmatter: { title: { eq: $category } }) {
            excerpt
            fields {
                slug
            }
            frontmatter {
                title
                subtitle
                color
            }
        }
        type: markdownRemark(frontmatter: { title: { eq: $type } }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
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
