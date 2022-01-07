import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, image, article }) => {
  const { site } = useStaticQuery(
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
    `
  );

  const { pathname } = useLocation();

  const {
    siteName,
    defaultTitle,
    defaultDescription,
    siteUrl,
    author,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    siteName: siteName,
    title: title ? `${title} - ${defaultTitle}` : defaultTitle,
    description: defaultDescription,
    image: `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname}`,
    author: author,
  };

  return (
    <Helmet htmlAttributes={{ lang: "fr" }} title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <link rel="canonical" href={seo.url} />
      <link rel="alternate" hreflang="x-default" href={seo.url} />

      {/* Open Graph data */}
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:locale" content="fr" />
      <meta property="og:site_name" content={seo.siteName} />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}

      {/* Twitter Card data  */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {twitterUsername && (
        <meta name="twitter:site" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}

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
          "jobTitle": "Frontend Developer",
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
  );
};

export default Seo;
