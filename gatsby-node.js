const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // Fetch Markdown
    const result = await graphql(
        `
            query {
                allFile(
                    filter: { internal: { mediaType: { eq: "text/markdown" } } }
                ) {
                    nodes {
                        id
                        sourceInstanceName
                        childMarkdownRemark {
                            id
                            frontmatter {
                                title
                                category
                                type
                                slug
                            }
                            fields {
                                fileName
                                language
                            }
                        }
                    }
                }
            }
        `
    );

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error on build loading markdown`,
            result.errors
        );
        return;
    }

    const { nodes } = result.data.allFile;
    const validSources = ["post", "category", "type"];

    if (nodes.length > 0) {
        nodes.forEach((node /*, index*/) => {
            if (validSources.includes(node.sourceInstanceName)) {
                const { frontmatter, fields } = node.childMarkdownRemark;

                /**
                 * Prepare links to other languages
                 */
                let alternatives;

                if (node.sourceInstanceName === "post") {
                    alternatives = nodes
                        .filter(
                            (altNode) =>
                                fields.fileName ===
                                    altNode.childMarkdownRemark.fields
                                        .fileName &&
                                altNode.sourceInstanceName === "post" &&
                                altNode.childMarkdownRemark.frontmatter?.type
                        )
                        .map((altNode) => {
                            const {
                                frontmatter: altFrontmatter,
                                fields: altFields
                            } = altNode.childMarkdownRemark;

                            return {
                                language: altFields.language,
                                slug: `${altFrontmatter.type.toLowerCase()}/${
                                    altFrontmatter.slug ?? altFields.fileName
                                }`
                            };
                        });
                }

                /**
                 * Prepare Slug
                 */
                let prepareSlug = [];

                // if not default language
                if (fields.language !== "fr") {
                    prepareSlug.push(fields.language);
                }

                if (node.sourceInstanceName === "post") {
                    // /articles/... /snippets/...
                    prepareSlug.push(frontmatter.type.toLowerCase());
                }

                // slug from frontmatter, else use filename
                if (frontmatter.slug) {
                    prepareSlug.push(`${frontmatter.slug}/`);
                } else {
                    prepareSlug.push(`${fields.fileName}/`);
                }

                /**
                 *
                 * Prepare Template
                 *
                 */
                let template;

                if (
                    node.sourceInstanceName === "type" &&
                    node.childMarkdownRemark.frontmatter.title === "Portfolio"
                ) {
                    // TYPE:PORTFOLIO TEMPLATE
                    template = path.resolve(
                        `./src/templates/portfolio_template/portfolio_template.jsx`
                    );
                } else if (
                    node.sourceInstanceName === "post" &&
                    node.childMarkdownRemark.frontmatter.type === "Portfolio"
                ) {
                    // POST:PORTFOLIO TEMPLATE
                    // SKIP PORTFOLIO ITEM FOR NOW

                    return;
                } else {
                    template = path.resolve(
                        `./src/templates/${node.sourceInstanceName}_template/${node.sourceInstanceName}_template.jsx`
                    );
                }

                // @todo maybe different createPage per source/type
                createPage({
                    path: prepareSlug.join("/"),
                    component: template,
                    context: {
                        id: node.childMarkdownRemark.id,
                        title: node.childMarkdownRemark.frontmatter.title,
                        category: node.childMarkdownRemark.frontmatter.category,
                        type: node.childMarkdownRemark.frontmatter.type,
                        language: fields.language,
                        //previousId,
                        //nextId,
                        alternatives
                    }
                });
            }
        });
    }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const filePath = createFilePath({ node, getNode });

        // filePathArray ex.: ['', 'fr', 'a-propos', '']
        const filePathArray = filePath.split("/");
        const langFromPath = filePathArray[1];
        const slugFromPath = filePathArray[2];

        // Add language from path to node.fields.language
        createNodeField({
            name: `language`,
            node,
            value: langFromPath
        });

        // Add filename as alternative slug (if none in frontmatter)
        createNodeField({
            name: `fileName`,
            node,
            value: slugFromPath
        });
    }
};
