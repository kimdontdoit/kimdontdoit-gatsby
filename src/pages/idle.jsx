import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import Seo from "the-great-gatsby-theme/src/components/Seo";

export default function Idle() {
    const { t } = useI18next("index");

    return (
        <>
            <Seo title={t(`contact-title`)} />

            <div className="pt-[100px]">
                <section className={`my-16`}>
                    <section className={`my-16 container`}>
                        <div className={`canva`}>
                            <div className={`grid`}>
                                {/* tiles */}
                                {/* add tiles from settings */}
                                {/* add character */}
                            </div>

                            <div className={`timer`}>{/* timer */}</div>
                            <div className={`actions`}></div>
                        </div>
                    </section>
                </section>
            </div>
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
    }
`;
