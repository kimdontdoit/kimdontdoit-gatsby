const siteUrl = /*process.env.siteUrl || */ `https://kimdontdoit.com/`;

module.exports = {
  siteMetadata: {
    siteName: `Kimdontdoit`,
    defaultTitle: `Vladislav Kim`,
    defaultDescription: `Salut! Mon nom est Vladislav Kim et je suis un Développeur Front End qui expérimente avec du back end à l'occasion. Présentement chez O2, je me concentre sur du code Javascript et PHP. J'écris également sur ce site + blogue à propos des sujets que je croise pour aider des gens de tous les niveaux, programmeur ou non.`,
    author: `@kimdontdoit`,
    siteUrl,
    defaultImage: `/media/cover.png`,
    twitterUsername: `@kimdontdoit`,
  },
  plugins: [
    `the-great-gatsby-theme`,
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },

    /*
    // Source locales
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `fr`],
        defaultLanguage: `fr`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: `https://kimdontdoit.com/`,
        redirect: false,
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang?/category/:uid",
            getLanguageFromPath: true,
          },
        ],
      },
    },
    */
    /** Theme/Design images */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    /** CMS/Content images */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/media`,
      },
    },
    // Markdown content
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `category`,
        path: `${__dirname}/content/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `type`,
        path: `${__dirname}/content/types`,
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
          `gatsby-remark-autolink-headers`, // before gatsby-remark-prismjs
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
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
    {
      resolve: `gatsby-plugin-sitemap`,
    },
  ],
};
