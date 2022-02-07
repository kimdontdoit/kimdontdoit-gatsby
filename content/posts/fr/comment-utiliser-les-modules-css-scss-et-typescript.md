---
template: single-post
title: Comment utiliser les modules CSS/SCSS et TypeScript
publish_date: 2021-01-13T18:43:36.588Z
authors:
  - Vladislav Kim
type: Articles
category: JavaScript
---

Cet article assume que vous avez déjà une base avec les modules CSS/SCSS et que votre projet utilise déjà TypeScript. Je propose la [solution trouvée](https://skovy.dev/generating-typescript-definitions-for-css-modules-using-sass/) qui enlève l’erreur (et j’espère qu’elle ne fait pas juste la cacher).

Quelques hooks converti vers TypeScript plus tard… Je passe aux composants et remarque malheureusement TypeScript qui hurle à mon import de module `.scss` :

`Cannot find module './MonComposant.module.scss' or its corresponding type declarations. ts(2307)`

Créer un fichier avec un nom représentant ce qu’on va mettre dedans, dans ce cas, `scss.d.ts` et rajoutez-y cette définition :

```ts
declare module "*.scss" {
  const styles: { [className: string]: string };
  export default styles;
}
```

Selon le cas, il soit possible que vous ayez besoin de mentionner ce dernier fichier dans votre `tsconfig.json`.

Attention! Cette solution courte ne permettra pas à TypeScript de vérifier l’existence des noms de classes lorsque vous les utilisez (ex. : styles.maClasse). Si vous cherchez quelque chose de plus complet, je vous conseille de jeter un coup d’oeil parmi les modules mentionné dans l’article de [Spencer Miskoviak](https://skovy.dev/generating-typescript-definitions-for-css-modules-using-sass/) qui a même pris le temps de développer son propre package pour supporter les modules SCSS en TypeScript.

Dépendant de vos besoins, ce qui est mentionné ici peut être suffisant. Ce qui est certain, c’est les divers avantages de TypeScript et des modules CSS (SASS/SCSS, fallait-il que je le mentionne!?) Sur ce, j’espère que cet article vous a été d’une certaine utilité et n’hésitez pas à nous laisser savoir dans les commentaires si ceci vous a aidé et si vous avez eu des résultats avec d’autres pistes.
