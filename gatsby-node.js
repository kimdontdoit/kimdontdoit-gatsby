const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Fetch Markdown
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
                slug
              }
              fields {
                slug
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

  const nodes = result.data.allFile.nodes;
  const validSources = ["post", "category", "type"];

  if (nodes.length > 0) {
    nodes.forEach((node, index) => {
      if (validSources.includes(node.sourceInstanceName)) {
        const previous = index === 0 ? null : nodes[index - 1].id;
        const next = index === nodes.length - 1 ? null : nodes[index + 1].id;

        const language = node.childMarkdownRemark.fields.language;

        let prepareSlug = [];

        // if not default language
        if (language !== "fr") {
          prepareSlug.push(language);
        }

        // @todo maybe make this into util
        if (node.sourceInstanceName === "post") {
          // /articles/... /snippets/...
          prepareSlug.push(node.childMarkdownRemark.frontmatter.type.toLowerCase());
        }

        // slug from frontmatter, else use filename
        if (node.childMarkdownRemark.frontmatter.slug) {
          prepareSlug.push(`${node.childMarkdownRemark.frontmatter.slug}/`);
        } else {
          prepareSlug.push(`${node.childMarkdownRemark.fields.slug}/`);
        }

        const template = path.resolve(
          `./src/templates/${node.sourceInstanceName}_template.jsx`
        );

        createPage({
          path: prepareSlug.join("/"),
          component: template,
          context: {
            id: node.childMarkdownRemark.id,
            title: node.childMarkdownRemark.frontmatter.title,
            category: node.childMarkdownRemark.frontmatter.category,
            type: node.childMarkdownRemark.frontmatter.type,
            file_slug: node.childMarkdownRemark.fields.slug,
            language,
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
    const filePath = createFilePath({ node, getNode });

    // filePathArray ex.: ['', 'fr', 'a-propos', '']
    const filePathArray = filePath.split("/");
    const lang_from_path = filePathArray[1];
    const slug = filePathArray[2];

    // Add language from path to node.fields.language
    createNodeField({
      name: `language`,
      node,
      value: lang_from_path,
    });

    // Add filename as alternative slug (if none in frontmatter)
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};
