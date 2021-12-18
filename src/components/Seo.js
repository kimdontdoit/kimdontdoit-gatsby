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
    image: defaultImage,
    url: `${siteUrl}${pathname}`,
    author: author,
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}

      <meta property="og:site_name" content={seo.siteName} />

      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
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
          "@type": [
            "http://schema.org/Organization",
            "http://schema.org/Person"
          ],
          "url": "${seo.siteUrl}",
          "name": "${seo.siteName}",
          "http://schema.org/email": [
            {
                "@value": "info@kimdontdoit.com"
            }
          ],
          "http://schema.org/address": [
            {
              "@type": [
                "http://schema.org/PostalAddress"
              ],
              "http://schema.org/addressCountry": [
                {
                  "@value": "Canada"
                }
              ],
              "http://schema.org/addressLocality": [
                {
                  "@value": "Montreal"
                }
              ],
              "http://schema.org/addressRegion": [
                {
                  "@value": "Quebec"
                }
              ]
            }
          ]
        }
      `}
      </script>
    </Helmet>
  );
};

export default Seo;
