import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { useI18next } from 'gatsby-plugin-react-i18next'

const Seo = ({
               title = ``,
               skipSiteName = false,
               titleSeparator = `-`,
               description = ``,
               image,
               article,
             }) => {
  const {languages, language, originalPath} = useI18next()

  const {site} = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    siteName
                    defaultTitle
                    defaultDescription
                    author
                    siteUrl
                    defaultImage
                    twitterUsername
                }
            }
        }
    `,
  )

  const {pathname} = useLocation()

  const {
    siteName,
    defaultTitle,
    siteUrl,
    author,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const getPageTitle = () => {
    if (skipSiteName) {
      return title
    } else {
      return `${title} ${titleSeparator} ${defaultTitle}`
    }
  }

  const seoData = {
    siteName: siteName, // ex `{title} - KimDontDoIt`
    title: getPageTitle(), // <Seo title="Accueil">
    description: description, // page description
    image: `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
    author: author,
  }

  return (
    <Helmet htmlAttributes={{lang: language}} title={seoData.title}>
      <meta name="description" content={seoData.description}/>
      <meta name="image" content={seoData.image}/>

      <link rel="canonical" href={seoData.url}/>

      {languages.map((lang) => {
        const localizedLink = `${siteUrl}/${lang}${originalPath}`

        return <link key={lang} rel="alternate" href={localizedLink} hreflang={lang} />
      })}

      <link rel="alternate" href={`${siteUrl}/en${originalPath}`} hreflang="x-default"/>

      { /*
         * Open Graph data
         */}
      {seoData.url && <meta property="og:url" content={seoData.url}/>}
      <meta property="og:locale" content={language}/>
      <meta property="og:site_name" content={seoData.siteName}/>
      {seoData.title && <meta property="og:title" content={seoData.title}/>}
      {seoData.description && (
        <meta property="og:description" content={seoData.description}/>
      )}
      {seoData.image && <meta property="og:image" content={seoData.image}/>}

      {
        /*
         * TWITTER CARD
         * <meta name="twitter:site" content={seoData.siteName} />
         * <meta name="twitter:domain" content={seoData.url}/>
         *<meta name="twitter:title" content={seoData.title}/>
         *<meta name="twitter:description" content={seoData.description}/>
         *<meta name="twitter:image" content={seoData.image}/>
         */
      }
      <meta name="twitter:card" content="summary_large_image"/>

      twitterUsername && (
      <meta name="twitter:creator" content={twitterUsername}/>
      <meta name="twitter:site" content={twitterUsername}/>
      )

      seoData.title && <meta name="twitter:title" content={seoData.title}/>
      seoData.description && <meta name="twitter:description"
                                   content={seoData.description}/>
      seoData.image && <meta name="twitter:image" content={seoData.image}/>}

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "url": "https://kimdontdoit.com",
          "name": "Vladislav Kim",
          "familyName": "Kim",
          "givenName": "Vladislav",
          "knowsLanguage": ["en-US", "fr-CA", "ru-RU"],
          "image": "https://kimdontdoit.com/media/wow-vladislav-kim.jpeg",
          "jobTitle": "Front end Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "O2 Web"
          },
          "alternateName": ["Kimdontdoit", "Vlad Kim"],
          "sameAs": [
            "https://github.com/kimdontdoit",
            "https://www.instagram.com/kimdontdoit/",
            "https://www.linkedin.com/in/vladislav-kim-3ba4a1172",
            "https://twitter.com/kimdontdoit",
            "https://kimdontdoit.tumblr.com/"
          ],
          "email": "mailto:info@kimdontdoit.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montreal",
            "addressCountry": "Canada",
            "addressRegion": "Quebec"
          }
        }
      `}
      </script>
    </Helmet>
  )
}

export default Seo
