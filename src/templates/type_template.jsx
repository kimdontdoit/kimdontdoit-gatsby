import React from "react";
import { Link, graphql } from "gatsby";

import { Pageheader } from "../components/Pageheader";
import Seo from "../components/Seo";

const Post = ({ post }) => {
  return (
    <div className="container mb-8 text-center">
      <Link className="font-bold" to={post.fields.slug}>
        Article: {post.frontmatter.title}
      </Link>
    </div>
  );
};

export default function TypeTemplate({ data, location }) {
  const { type } = data;
  const posts = data.posts.nodes;

  return (
    <>
      <Seo title={type.frontmatter.title} />
      <div>
        <section className={`my-16`}>
          <Pageheader title={type.frontmatter.title} center={true} />
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
        internal: { mediaType: { eq: "text/markdown" } }
        childMarkdownRemark: { frontmatter: { type: { eq: $title } } }
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
