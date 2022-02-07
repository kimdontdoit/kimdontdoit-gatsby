import React from "react";
import { Link, graphql } from "gatsby";

import Pageheader from "@kimdontdoit/the-great-gatsby-theme/src/components/Pageheader";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

const Post = ({ post }) => {
  return (
    <div className="container mb-8">
      <Link className="font-bold" to={post.fields.slug}>
        {post.frontmatter.title}
      </Link>
    </div>
  );
};

export default function TypeTemplate({ data, location }) {
  const { type } = data;
  const posts = data.posts.nodes;

  const crumbs = [];

  crumbs.push({
    label: "Retour à l'accueil",
    url: "/",
  });

  return (
    <>
      <Seo title={type.frontmatter.title} />
      <div>
        <section className={`my-16`}>
          <Pageheader title={type.frontmatter.title} crumbs={crumbs} />
        </section>

        {type.html && (
          <section>
            <div
              dangerouslySetInnerHTML={{ __html: type.html }}
              itemProp="articleBody"
              className={`container max-w-screen-md text-lg`}
            ></div>
          </section>
        )}

        <section className={`pb-16`}>
          {posts &&
            posts.map((post) => {
              return <Post key={post.id} post={post.childMarkdownRemark} />;
            })}
        </section>
      </div>
    </>
  );
}

export const templateQuery = graphql`
  query singleType($id: String!, $title: String) {
    type: markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
    posts: allFile(
      filter: {
        sourceInstanceName: { eq: "post" }
        childMarkdownRemark: {
          fields: { language: { eq: "fr" } }
          frontmatter: { type: { eq: $title } }
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
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
