const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const PATH_TO_MD_PAGES = path.resolve("content");

const _getMarkdownNodeIdAndLanguage = (node) => {
  const slug = node.childMarkdownRemark.fields.slug;
  const _slug = slug.split("/");
  const lang = _slug[0];

  return { lang };
};

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
                category
                type
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

  const validSources = ["post", "category"];

  if (nodes.length > 0) {
    nodes.forEach((node, index) => {
      const { lang } = _getMarkdownNodeIdAndLanguage(node);

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
            category: node.childMarkdownRemark.frontmatter.category,
            type: node.childMarkdownRemark.frontmatter.type,
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

    const value_removed_fr = value.replace("/fr", "");

    createNodeField({
      name: `slug`,
      node,
      value: value_removed_fr,
    });

    // Format: ['', 'fr', 'slug_key', '']
    const value_removed_lang = value.split("/")[2];

    createNodeField({
      name: `slug_key`,
      node,
      value: value_removed_lang,
    });
  }
};
