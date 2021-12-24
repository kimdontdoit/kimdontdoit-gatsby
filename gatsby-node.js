const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      query {
        allFile(filter: { internal: { mediaType: { eq: "text/markdown" } } }) {
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
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const nodes = result.data.allFile.nodes;

  const validSources = ["posts", "categories"];

  if (nodes.length > 0) {
    nodes.forEach((node, index) => {
      if (validSources.includes(node.sourceInstanceName)) {
        const previous = index === 0 ? null : nodes[index - 1].id;
        const next = index === nodes.length - 1 ? null : nodes[index + 1].id;
        const template = path.resolve(
          `./src/templates/${node.sourceInstanceName}_template.jsx`
        );

        createPage({
          path: node.childMarkdownRemark.fields.slug,
          component: template,
          context: {
            id: node.childMarkdownRemark.id,
            title: node.childMarkdownRemark.frontmatter.title,
            previous,
            next,
          },
        });
      }
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
