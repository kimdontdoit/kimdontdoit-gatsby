const config = {
    siteUrl: `https://ai.kimdontdoit.com`,
    author: `@kimdontdoitai`,
    firstName: `Vladislav`,
    lastName: `Kim`,
    siteName: `Kimdontdoit`,
    defaultTitle: `Vladislav Kim`,
    defaultImage: `/media/cover.png`,
    twitteUsername: `@kimdontdoit,`
};

// fetch languages settings
const { languages, defaultLanguage } = require("./languages");

module.exports = {
    flags: {
        // FAST_DEV: true,
    },
    siteMetadata: {
        siteName: config.siteName,
        defaultTitle: config.defaultTitle,
        lastName: config.lastName,
        firstName: config.firstName,
        author: config.author,
        siteUrl: config.siteUrl,
        defaultImage: config.defaultImage,
        twitterUsername: config.twitteUsername
    },
    plugins: [
        `the-great-gatsby-theme`,
        `gatsby-plugin-image`,
        `gatsby-plugin-netlify`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/locales`,
                name: `locale`
            }
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
                languages,
                defaultLanguage,
                // if you are using Helmet, you must include siteUrl, and make sure you add http:https
                siteUrl: config.siteUrl,
                redirect: false,
                // you can pass any i18next options
                i18nextOptions: {
                    fallbackLng: defaultLanguage,
                    supportedLngs: languages,
                    defaultNS: "common",
                    interpolation: {
                        escapeValue: false // not needed for react as it escapes by default
                    }
                },
                pages: []
            }
        },
        {
            // CMS / Content images
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `uploads`,
                path: `${__dirname}/static/media`
            }
        },
        {
            resolve: `gatsby-plugin-postcss`
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: [`auto`, `webp`],
                    placeholder: `dominantColor`,
                    quality: 85
                }
            }
        },
        /* TODO: add manifest
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Kimdontdoit`,
                short_name: `Kimdontdoit`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `standalone`,
                icon: `src/images/icon.gif`
            }
        },*/
        {
            resolve: `gatsby-source-wordpress`,
            options: {
                // Specify the URL of the WordPress source
                url: `https://app.kimdontdoit.com/graphql`
            }
        },
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                excludes: ["/**/404", "/**/404.html"]
            }
        }
    ]
};
