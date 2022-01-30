const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// const PATH_TO_MD_PAGES = path.resolve("content");

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
      `There was an error loading your blog posts`,
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

        // let prepareSlug = [""];

        if (language !== "fr") {
          return;

          //prepareSlug.push(node.childMarkdownRemark.fields.language);
        }

        /*
        //prepareSlug.push(node.sourceInstanceName);
        prepareSlug.push(node.childMarkdownRemark.fields.slug);

        const slug = prepareSlug.join("/");

        console.log(prepareSlug);
        console.log(slug);
        */
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

    // ex.: ['', 'fr', 'a-propos', '']
    const filePathArray = filePath.split("/");

    const lang = filePathArray[1];

    let slug = [...filePathArray];
    slug.splice(1, 1);
    slug = slug.join("/");

    const slug_key = filePathArray[2];

    createNodeField({
      name: `language`,
      node,
      value: lang,
    });

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });

    createNodeField({
      name: `slug_key`,
      node,
      value: slug_key,
    });
  }
};
