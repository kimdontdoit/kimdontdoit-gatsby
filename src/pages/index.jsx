import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Button from "@kimdontdoit/the-great-gatsby-theme/src/components/Button";
import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

import * as classes from "./index.module.scss";

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t(`Kimdontdoit, or also Vladislav Kim`)} />
      <section className={`${classes.section} pt-16 md:pt-40 pb-8`}>
        <div className="container">
          <h1 className={`bigTitle mb-12`}>
            <Trans>Salut 👋 moi c’est Vlad.</Trans>{" "}
            <span className={`opacity-30`}>
              <Trans>
                Je développe, j’apprends et j’améliore — spécialisé Front-end
              </Trans>
            </span>
          </h1>

          <h1 className={`${classes.mediumTitle} mb-16`}>
            <span className={`opacity-30`}>basé à Tiohtià:ke / Montréal.</span>
          </h1>

          <Button
            href="/vladislav-kim-a-propos"
            className="bg-black text-white"
          >
            En savoir plus
          </Button>
        </div>
      </section>

      <section className={`${classes.section} pt-16 pb-16 md:pb-40`}>
        <div className="container">
          <h1 className={`bigTitle`}>
            <span className={`highlight`}>Kimdontdoit</span>, ce n’était qu’un
            pseudonyme. Aujourd’hui, c’est mon blogue avec lequel j’espère vous
            partager quelque chose d’utile
          </h1>
        </div>
      </section>

      <section
        className={`${classes.section} ${classes.workSection} bg-gray-100 py-16 md:py-40`}
      >
        <div className="container">
          <div>
            <h2 className={`bigTitle mb-8`}>Travaille récemment sur :</h2>
            <div className={`grid md:grid-cols-3 grid-cols-1 gap-8 `}>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}
              >
                <h3 className={`font-medium text-2xl mb-8`}>24/7 Magento 2</h3>

                <StaticImage
                  src="../images/commercial_social_share_magento.png"
                  alt="Magento 2"
                />
              </div>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}
              >
                <h3 className={`font-medium text-2xl mb-8`}>
                  Gatsby + Headless Magento
                </h3>

                <StaticImage
                  src="../images/home-page_fast-to-build-1024x1024.png"
                  alt="Gatsby 4"
                />
              </div>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}
              >
                <h3 className={`font-medium text-2xl mb-8`}>
                  Sites Salon/Conférence
                </h3>

                <StaticImage
                  src="../images/salonparentsenfants.png"
                  alt="Magento 2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${classes.section} bg-primary py-16 md:py-40`}>
        <div className="container">
          <h1 className={`bigTitle`}>
            Objectif : utiliser des techno modernes pour offrir de belles
            expériences et écrire du code réutilisable.{" "}
            <span className={`opacity-30`}>
              #react #web #magento #wordpress #gatsby
            </span>
          </h1>
        </div>
      </section>

      <section className={`${classes.section} py-16 md:py-40`}>
        <div className={`container`}>
          <h2 className={`bigTitle mb-8`}>
            Organisation <span className={`opacity-30`}>O2web</span>
          </h2>

          <div className={`${classes.block} bg-gray-100`}>
            <div className={`${classes.blockContent} text-center mx-auto`}>
              <StaticImage
                className={`w-16 mb-8`}
                src="../images/o2web_transparent.png"
                alt="O2 Web Transparent Logo"
              />
              <p className={`font-medium text-2xl`}>
                O2web est une agence numérique unique qui excelle en e-commerce{" "}
                <span className={`opacity-30`}>
                  et apporte à ses clients tout ce dont ils ont besoin pour
                  atteindre leurs objectifs
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${classes.section} bg-primary pt-16 md:pt-40 pb-16`}>
        <div className={`container text-center`}>
          <p className={`bigTitle mb-16`}>
            Avez-vous une question? Soumettez une idée d’article
          </p>

          <Button className="bg-black text-white">Posez votre question</Button>
        </div>
      </section>
    </>
  );
}

// TODO is this wrong in the exemple
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
