import React, { useState } from "react";
import { graphql } from "gatsby";

import Seo from "the-great-gatsby-theme/src/components/Seo";

import { Tooltip } from "../components/Tooltip";
import { Button } from "../components/Button";
import { DoNotDo } from "../components/DoNotDo";

export default function AppPage() {
    // const { t, language } = useI18next("index");
    // 3am march 24 2023

    // T_T donotdo ... wow the name is so bad (written by github copilot)
    // hey, you could probably link ads to this page

    let [isOpen, setIsOpen] = useState(true);

    const handle1PClick = () => {
        setIsOpen(true);
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
            <DoNotDo isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="block pt-40 md:pt-52 pb-16 md:pb-24">
                <div className="container max-w-screen-lg">
                    <h1 className="mb-8">
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
