module.exports = {
  siteMetadata: {
    siteName: `Kimdontdoit`,
    defaultTitle: `Vladislav Kim`,
    defaultDescription: `Salut! Mon nom est Vladislav Kim et je suis un Développeur Front End qui expérimente avec du back end à l'occasion. Présentement chez O2, je me concentre sur du code Javascript et PHP. J'écris également sur ce site + blogue à propos des sujets que je croise pour aider des gens de tous les niveaux, programmeur ou non.`,
    author: `@kimdontdoit`,
    siteUrl: `https://kimdontdoit-gatsby.netlify.app`,
    defaultImage: `/media/cover.png`,
    twitterUsername: `@kimdontdoit`,
  },
  flags: {
    //FAST_DEV: true,
  },
  plugins: [
    /*`@kimdontdoit/the-great-gatsby-theme`, */
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/media`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`, // resolve: `gatsby-remark-relative-images`,
            options: {
              maxWidth: 630,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`./tailwind.config.js`), // Optional: Load custom Tailwind CSS configuration
        ],
        sassOptions: {},
        useResolveUrlLoader: {
          options: {
            sourceMap: true,
          },
        },
        // additionalData: `@import `${__dirname}/src/styles/variables`;`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 85,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kimdontdoit`,
        short_name: `Kimdontdoit`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icon.gif`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
  ],
};
