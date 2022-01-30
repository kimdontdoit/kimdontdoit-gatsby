import React from "react";

import Seo from "@kimdontdoit/the-great-gatsby-theme/src/components/Seo";

export default function AboutPage() {
  return (
    <>
      <Seo title="Vladislav Kim, c’est qui?" />

      <section className={`my-16`}>
        <div className={`container text-center`}>
          <h1 className={`text-4xl font-black`}>Vladislav Kim, c’est qui?</h1>
        </div>
      </section>

      <section className={`pb-16`}>
        <div className={`container max-w-screen-md`}>
          <p className={`text-lg`}>
            Salut! Mon nom est Vladislav Kim et je suis un Développeur Front End
            qui expérimente avec du back end à l’occasion. Présentement chez
            O2web à Montréal, je me concentre sur du code Javascript et PHP.
            J’écris également sur ce site + blogue à propos des sujets que je
            croise pour aider des gens de tous les niveaux, programmeur ou non.
          </p>
        </div>
      </section>
    </>
  );
}
