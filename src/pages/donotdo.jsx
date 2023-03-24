import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import Seo from "the-great-gatsby-theme/src/components/Seo";
import { Tooltip } from "../components/Tooltip";
import Button from "../components/Button";

export default function AppPage() {
    // const { t, language } = useI18next("index");
    const currentDate = dayjs().format("D MMMM YYYY");
    // 3am march 24 2023

    // T_T donotdo ... wow the name is so bad (written by github copilot)
    // hey, you could probably link ads to this page

    const handle1PClick = () => {
        console.log("prout");
    };

    const handleTClick = () => {
        console.log("prout prout");
    };

    return (
        <>
            <Seo
                title={
                    "donotdo, a purposeful dashboard app for collaboration and productivity by Vladislav Kim"
                }
                skipSiteName={true}
            />
            <div class="block pt-40 md:pt-52 pb-16 md:pb-24">
                <div className="container max-w-screen-lg">
                    <div>{currentDate}</div>

                    <h1>
                        donotdo, a purposeful dashboard app for collaboration
                        and productivity by Vladislav Kim
                    </h1>

                    {/* T_T paid plan to save in the cloud, else load from file + localstorage */}

                    <div className="flex">
                        <Button
                            className="bg-zinc-900 text-white"
                            onClick={handle1PClick}
                        >
                            1 player
                        </Button>
                        <Tooltip
                            id="dnd-2p-tooltip"
                            title="Coming soon... mmmmmaybe"
                            mt="0.5rem"
                        >
                            <Button
                                className="bg-zinc-900 text-white ml-2"
                                onClick={handle1PClick}
                                disabled
                            >
                                Team player
                            </Button>
                        </Tooltip>
                    </div>
                </div>
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
