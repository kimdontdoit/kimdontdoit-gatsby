import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import Pageheader from "the-great-gatsby-theme/src/components/Pageheader";
import Seo from "the-great-gatsby-theme/src/components/Seo";

import { Post } from "../../components/Post";

export default function TypeTemplate({ data }) {
    const { t } = useI18next("index");

    const { type } = data;
    const posts = data.posts.nodes;

    const crumbs = [];

    crumbs.push({
        label: t("back-to-home"),
        url: "/"
    });

    return (
        <>
            <Seo title={type.frontmatter.title} />
            <div className="pt-[100px]">
                <section className={`my-16 container`}>
                    <Pageheader
                        title={type.frontmatter.title}
                        subtitle={type.frontmatter.short_description}
                        crumbs={crumbs}
                    ></Pageheader>
                </section>

                {
                    /**
                     * TYPE DESCRIPTION SECTION IN HTML
                     */
                    type.html && (
                        <section className="container">
                            <div
                                dangerouslySetInnerHTML={{ __html: type.html }}
                                itemProp="articleBody"
                                className={`max-w-screen-lg text-lg`}
                            ></div>
                        </section>
                    )
                }

                {/**
                 * TYPE LISTING SECTION IN HTML
                 */}
                <section className={`container pb-16`}>
                    <div className="max-w-screen-lg mx-auto">
                        {posts &&
                            posts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        node={post.childMarkdownRemark}
                                    />
                                );
                            })}
                    </div>
                </section>
            </div>
        </>
    );
}

export const query = graphql`
    query singleType($id: String!, $title: String, $language: String!) {
        type: markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                title
                short_description
            }
        }
        posts: allFile(
            filter: {
                sourceInstanceName: { eq: "post" }
                childMarkdownRemark: {
                    frontmatter: { type: { eq: $title } }
                    fields: { language: { eq: $language } }
                }
            }
            sort: {
                childMarkdownRemark: { frontmatter: { publish_date: DESC } }
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
                        publish_date
                        category
                    }
                    fields {
                        fileName
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
`;
