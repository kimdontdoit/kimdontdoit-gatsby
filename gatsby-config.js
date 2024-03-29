const siteUrl = `https://kimdontdoit.com`;
const { languages, defaultLanguage } = require("./languages");

module.exports = {
    flags: {
        // FAST_DEV: true,
    },
    siteMetadata: {
        siteName: `Kimdontdoit`,
        defaultTitle: `Vladislav Kim`,
        lastName: `Kim`,
        firstName: `Vladislav`,
        author: `@kimdontdoit`,
        siteUrl,
        defaultImage: `/media/cover.png`,
        twitterUsername: `@kimdontdoit`
    },
    plugins: [
        `the-great-gatsby-theme`,
        `gatsby-plugin-image`,
        `gatsby-plugin-netlify`,
        /*
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },*/
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
                siteUrl,
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
                pages: [
                    {
                        // posts and types generated from gatsby-node.js
                        matchPath: "/:lang?/:type(articles|snippets)/:uid?",
                        getLanguageFromPath: true,
                        excludeLanguages: ["en"]
                    },
                    {
                        // categories generated from gatsby-node.js
                        matchPath:
                            "/:lang?/:category(serveur|php|wordpress|javascript)",
                        getLanguageFromPath: true,
                        excludeLanguages: ["en"]
                    }
                ]
            }
        },
        {
            //Theme / Design images
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
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
            // Markdown content: posts
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `post`,
                path: `${__dirname}/content/posts`
            }
        },
        {
            // Markdown content: categories
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `category`,
                path: `${__dirname}/content/categories`
            }
        },
        {
            // Markdown content: post types
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `type`,
                path: `${__dirname}/content/types`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-relative-images`,
                    {
                        resolve: `gatsby-remark-images`, // resolve: `gatsby-remark-relative-images`,
                        options: {
                            // maxWidth: 630,
                        }
                    },
                    `gatsby-remark-autolink-headers`, // before gatsby-remark-prismjs
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`
                ]
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
                    // breakpoints: [750, 1080, 1366, 1920],
                    // backgroundColor: `transparent`,
                    // tracedSVGOptions: {},
                    // blurredOptions: {},
                    // jpgOptions: {},
                    // pngOptions: {},
                    // webpOptions: {},
                    // avifOptions: {},
                }
            }
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
                icon: `src/images/icon.gif`
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
