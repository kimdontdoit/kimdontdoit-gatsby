import React, { useContext } from "react";
import { StaticImage } from "gatsby-plugin-image";

import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

import Button from "../components/Button";
import memoji from "../images/memoji_bump.png";
import ThemeContext from "../context/ThemeContext";

import * as classes from "./index.module.css";

export default function IndexPage() {
  const { setCursorImage, setShowCursorImage } = useContext(ThemeContext);

  const setMemojiCursor = (e) => {
    setCursorImage(memoji);
    setShowCursorImage(true);
  };

  const resetCursorImage = (e) => {
    // move this to cursor component setCursorImage(undefined);
    setShowCursorImage(false);
  };

  return (
    <>
      <Seo title={`Kimdontdoit, or also Vladislav Kim`} />

      <section className={`${classes.section} pt-16 md:pt-36 pb-8`}>
        <div className="container max-w-screen-lg">
          <h1 className={`bigTitle mb-12`}>
            Salut 👋 moi c’est{" "}
            <div className={`${classes.kim}`} role="tooltip">
              <button
                onMouseEnter={setMemojiCursor}
                onMouseLeave={resetCursorImage}>
                Vlad
              </button>
            </div>
            .{" "}
            <span className={`opacity-30`}>
              Je développe, j’apprends et j’améliore — spécialisé Front-end
            </span>
          </h1>

          <h1 className={[`opacity-30`, "mb-16", "font-medium"].join(" ")}>
            basé à Tiohtià:ke / Montréal.
          </h1>

          <Button
            href="/vladislav-kim-a-propos"
            className="bg-black text-white">
            En savoir plus
          </Button>
        </div>
      </section>

      <section className={`${classes.section} pt-16 pb-16 md:pb-40`}>
        <div className="container max-w-screen-lg">
          <h1 className={`headingTitle`}>
            <span className={`highlight`}>Kimdontdoit</span>, ce n’était qu’un
            pseudonyme. Aujourd’hui, c’est mon blogue avec lequel j’espère vous
            partager quelque chose d’utile
          </h1>
        </div>
      </section>

      <section
        className={`${classes.section} ${classes.workSection} bg-gray-100 py-16 md:py-40`}>
        <div className="container max-w-screen-lg">
          <div>
            <h2 className={`headingTitle mb-8`}>Travaille récemment sur :</h2>
            <div className={`grid md:grid-cols-3 grid-cols-1 gap-8 `}>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}>
                <h3 className={`font-medium text-2xl mb-8`}>24/7 Magento 2</h3>

                <StaticImage
                  src="../images/commercial_social_share_magento.png"
                  alt="Magento 2"
                />
              </div>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}>
                <h3 className={`font-medium text-2xl mb-8`}>
                  Gatsby + Headless Magento
                </h3>

                <StaticImage
                  src="../images/home-page_fast-to-build-1024x1024.png"
                  alt="Gatsby 4"
                />
              </div>
              <div
                className={`${classes.card} flex flex-col flex-1 p-8 bg-white`}>
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
        <div className="container max-w-screen-lg">
          <h1 className={`headingTitle`}>
            Objectif : utiliser des techno modernes pour offrir de belles
            expériences et écrire du code réutilisable.{" "}
            <span className={`opacity-30`}>
              #react #web #magento #wordpress #gatsby
            </span>
          </h1>
        </div>
      </section>

      <section className={`${classes.section} py-16 md:py-40`}>
        <div className={`container max-w-screen-lg`}>
          <h2 className={`headingTitle mb-8`}>
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

      <section className={`${classes.section} bg-dark pt-16 md:pt-40 pb-16 `}>
        <div className={`container max-w-screen-lg text-center`}>
          <p className={`headingTitle mb-16 text-white`}>
            Avez-vous une question?
            <br />
            Soumettez une idée d’article
          </p>

          <Button className="bg-primary">Posez votre question</Button>
        </div>
      </section>
    </>
  );
}
