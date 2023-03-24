import React, { useRef, useMemo, useEffect } from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import Pageheader from "the-great-gatsby-theme/src/components/Pageheader";
import Seo from "the-great-gatsby-theme/src/components/Seo";

import { useThemeContext } from "../context/ThemeContext";
import Notice from "../components/Notice";
import * as classes from "./post_template.module.css";

export default function PostTemplate({ data, pageContext }) {
    const { post, type, category } = data;
    const { alternatives } = pageContext;
    const { title, publish_date, description } = post.frontmatter;

    const { t, language } = useI18next("index");
    const { setScrollProgressTarget } = useThemeContext();
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            setScrollProgressTarget(ref);
        }
    }, [ref]);

    // TODO verify and dynamically change language in locale()
    // TODO add category

    const date = useMemo(() => {
        return language === "fr"
            ? dayjs(publish_date).locale("fr-ca").format("D MMMM YYYY")
            : dayjs(publish_date).locale("en").format("MMMM D, YYYY");
    }, [language, publish_date]);

    const shortDate = useMemo(() => {
        return language === "fr"
            ? dayjs(publish_date).locale("fr-ca").format("D MMM YYYY")
            : dayjs(publish_date).locale("en").format("MMM D, YYYY");
    }, [language, publish_date]);

    const crumbs = [];

    // VERIFY THIS
    if (type) {
        crumbs.push({
            label: `${t(`all-the`)} ${type.frontmatter.title}`,
            url: `/${type.fields.fileName}`
        });
    }

    if (category) {
        crumbs.push({
            label: category.frontmatter.title,
            url: `/${category.fields.fileName}`
        });
    }

    return (
        <>
            <Seo
                title={title}
                description={description || post.excerpt}
                alternatives={alternatives}
            />

            <article
                itemScope
                itemType="http://schema.org/Article"
                ref={ref}
                className="pt-[100px]"
            >
                <section className={`my-16 container`}>
                    <Pageheader title={title} center={true} crumbs={crumbs}>
                        {shortDate && (
                            <p
                                className={`font-medium font-display mt-4 opacity-69`}
                            >
                                {shortDate}
                                {post.timeToRead > 1 &&
                                    ` • ${post.timeToRead} min. de lecture`}
                            </p>
                        )}
                    </Pageheader>
                </section>

                {false && <Notice />}

                <section className="pb-16 container flex">
                    <div className={`${classes.content} flex-1`}>
                        {/*
                         * PostContent from Markdown
                         */}
                        <div
                            dangerouslySetInnerHTML={{ __html: post.html }}
                            className={`md:max-w-2xl text-lg mx-auto`}
                        ></div>

                        {/*
                         * Bottom of post
                         */}
                        <div className="md:max-w-2xl mx-auto font-display">
                            {date && (
                                <p
                                    className={`font-medium mt-4 mb-0 opacity-69`}
                                >{`${t("published-on")} ${date}`}</p>
                            )}

                            <p className={`font-medium opacity-69`}>{`${t(
                                `published-by`
                            )} Vladislav Kim`}</p>
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
    );
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
                fileName
            }
            frontmatter {
                title
                subtitle
                color
            }
        }
        type: markdownRemark(frontmatter: { title: { eq: $type } }) {
            fields {
                fileName
            }
            frontmatter {
                title
            }
        }
        previous: markdownRemark(id: { eq: $previousPostId }) {
            fields {
                fileName
            }
            frontmatter {
                title
            }
        }
        next: markdownRemark(id: { eq: $nextPostId }) {
            fields {
                fileName
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
`;
