import React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import Pageheader from "@kimdontdoit/the-great-gatsby-theme/src/components/Pageheader";

import ScrollProgress from "@kimdontdoit/the-great-gatsby-theme/src/components/ScrollProgress";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

import * as classes from "./posts_template.module.scss";

export default function PostTemplate({ data, location }) {
  const { post, category, type } = data;

  console.log(type);

  //const { previous, next } = data;
  const title = post.frontmatter.title;

  const date = dayjs(post.frontmatter.publish_date)
    .locale("fr")
    .format("D MMMM YYYY");
  const crumbs = [];

  if (category) {
    crumbs.push({
      label: category.frontmatter.title,
      url: category.fields.slug,
    });
  }

  if (type) {
    crumbs.push({ label: type.frontmatter.title, url: type.fields.slug });
  }

  const target = React.createRef();

  return (
    <>
      <Seo
        title={title}
        description={post.frontmatter.description || post.excerpt}
      />

      <ScrollProgress target={target} />

      <article itemScope itemType="http://schema.org/Article" ref={target}>
        <section className={`my-16`}>
          <Pageheader title={title} crumbs={crumbs} date={date} />
        </section>

        <section className="pb-16 container flex">
          <div className={`${classes.content} flex-1`}>
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
              className={`max-w-screen-md text-lg`}
            ></div>
          </div>

          {post.tableOfContents && (
            <div className={`${classes.toc}`}>
              <h3 className={`text-lg font-bold mb-4`}>Table des matières</h3>
              <div
                dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
              ></div>
            </div>
          )}
        </section>
      </article>
    </>
  );
}

export const templateQuery = graphql`
  query postById(
    $id: String!
    $category: String!
    $type: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        publish_date
        type
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
  }
`;
