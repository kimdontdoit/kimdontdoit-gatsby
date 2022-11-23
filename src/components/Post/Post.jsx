import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'

const Post = ({ node }) => {
  const { language, defaultLanguage } = useI18next()

  let slug = language !== defaultLanguage ? `/${language}` : ``

  slug += node.frontmatter.type
    ? `/${node.frontmatter.type.toLowerCase()}`
    : ``
  slug += `/${node.frontmatter.slug ?? node.fields.slug}/`

  return (
    <div className="mb-8">
      <Link className="font-medium" to={slug}>
        {node.frontmatter.title}
      </Link>
    </div>
  )
}

export default Post
