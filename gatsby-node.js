const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
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
