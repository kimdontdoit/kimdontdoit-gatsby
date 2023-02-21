import React from "react";
import { graphql } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import { ContactForm } from "../components/Form";
import Seo from "the-great-gatsby-theme/src/components/Seo";

export default function ContactPage() {
  const { t } = useI18next("index");

  const handleContactSubmit = async (data) => {
    const formData = {
      ...data,
      access_key: "6e4ce35b-a72e-4da3-95e3-ccb5db8f3d00"
    };

    const {
      data: responseData,
      message,
      success
    } = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((res) => res.json());
  };

  return (
    <>
      <Seo title={t(`contact-title`)} />

      <section className={`my-16`}>
        <div className={`container max-w-xl mx-auto text-center mb-4`}>
          <h1 className={`text-4xl font-bold`}>{t(`contact-title`)}</h1>
        </div>
        <div className={`container max-w-screen-lg mx-auto text-center`}>
          <h2
            className={`text-lg md:text-2xl text-slate-500 md:whitespace-pre-line`}
          >
            {t(`contact-intro`)}
          </h2>
        </div>
      </section>

      <section className="pb-16">
        <div className={`container max-w-screen-lg mx-auto`}>
          <ContactForm onSubmit={handleContactSubmit} />
        </div>
      </section>
    </>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
