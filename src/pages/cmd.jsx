import React from "react";
import { graphql } from "gatsby";
import { supabase } from "../supabaseClient";
import { useQuery } from "@tanstack/react-query";

import Seo from "the-great-gatsby-theme/src/components/Seo";

import { Prompt } from "../components/Prompt";

import * as classes from "./donotdo.module.css";

export default function Admin() {
    // maybe allow keys (1 or l, 2 or r)?
    const prompts = [
        {
            prompt: "Welcome\nLogin or create an account to continue",
            prompt_metas: {
                type: "choices",
                options: [
                    { option: "Login", key: "1", prompt_id: 2 },
                    { option: "Create an account", key: "2", prompt_id: 3 }
                ]
            }
        }
    ];

    // fetch the project
    /*     const fetchProject = async () => await supabase.from("projects").select();

    const [projects, setProjects] = useState([]);

    const { data: projectsData, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects
    });
 */

    // fetch the initial Prompt
    // get the Prompt's metas

    const config = {
        apiKey: "123", // @TODO
        initialPrompt: {
            id: 1,
            prompt: "Welcome\nLogin or create an account to manage your cmd", // @TODO: take this from the DB
            metas: {
                title: "Login",
                type: "choices",
                options: [
                    { option: "Login", key: "1", id: 2 },
                    { option: "Create an account", key: "2", id: 3 }
                ]
            }
        }
    };

    const prompts = [""];

    return (
        <>
            <Seo title={"cmd.new"} />

            <div className={classes.landing}>
                <div className={classes.container}>
                    <div className={classes.intro}>
                        <span className={classes.badge}>v.0.0.1</span>
                        <h1>⌘</h1>
                        <p>
                            {`a UX (user experience) experiment: everything in a
                            prompt`}
                        </p>
                    </div>

                    <Prompt config={config} />
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
