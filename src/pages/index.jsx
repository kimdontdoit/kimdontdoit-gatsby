import React from "react";
import { graphql } from "gatsby";
import { Link, useI18next } from "gatsby-plugin-react-i18next";

import Seo from "the-great-gatsby-theme/src/components/Seo";
import { Section } from "../components/Layout";
import { Heading } from "../components/Typography";
import { WpPost } from "../components/Post";
import * as classes from "./index.module.css";

const Posts = ({ posts }) => {
    return (
        <>
            <Heading tag="h2" className="mb-6 font-bold text-2xl">
                Browse AI products
            </Heading>

            {posts.map((post) => {
                return <WpPost key={post.id} post={post.node} />;
            })}
        </>
    );
};
export default function HomePage(props) {
    const { t } = useI18next();
    const { data } = props;

    const posts = data.allWpAiProduct.edges;

    return (
        <>
            <Seo
                title={t("title")}
                description={t("seo_description")}
                skipSiteName={true}
            />

            <Section className={classes.heroSection}>
                <Heading tag="h1" className={`text-center mb-12`}>
                    Step up your AI 🔮 game
                    <br />
                    with our curated collection.
                </Heading>

                <Heading tag="h2" className={`text-center ${classes.sideKick}`}>
                    See through the hype, find the right, mature, AI tools for
                    your business.
                </Heading>

                <div className={`${classes.homeContainer} mb-16`}>
                    <Posts posts={posts} />
                </div>

                <div className={classes.homeContainer}>
                    <Heading tag="h2" className="mb-6 font-bold text-2xl">
                        What is this?
                    </Heading>
                    <p className="text-lg mb-4">
                        As a developer and creator of digital experiences +
                        products, I created ai.kimdontdoit.com to reduce the
                        noise around "AI" hype. I mean to actually help people
                        see through the hype around the subject and find the
                        right tools build with quality and longevity in mind.
                    </p>
                    <p>
                        -{" "}
                        <Link
                            className="opacity-60"
                            to="https://kimdontdoit.com"
                        >
                            kimdontdoit
                        </Link>
                    </p>
                </div>
            </Section>
        </>
    );
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
        allWpAiProduct {
            edges {
                node {
                    id
                    status
                    slug
                    title
                    excerpt
                    dateGmt
                    modifiedGmt
                    uri
                }
            }
        }
    }
`;
