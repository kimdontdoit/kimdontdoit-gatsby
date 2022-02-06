---
template: single-post
title: Rediriger sans-www vers www (et vice-versa) avec Apache htaccess
publish_date: 2020-08-24T17:48:49.104Z
authors:
  - Vladislav Kim
type: Articles
category: Serveur
---

Forcer l’url de votre site web en www ou sans-www est nécessaire pour éviter un dédoublement de vos pages dans Google et les autres moteurs de recherche. Si vos pages affichent en double, il se peut que vous ne bénéficiez pas de tout les avantages de référencement SEO hors-site qui pointent sur vos pages. Vous pouvez sauver du temps dans le futur également en utilisant cette technique avant que votre site soit indexé dans Google.

Si vous n’êtes pas certain si votre site est hébergé sur Apache, contactez votre hébergement web. Vous pouvez également créer cette redirection dans Cpanel, Cloudflare ou Nginx, si applicable.

Pour uniformiser vos URL dans Google ou si un de vos outils oblige le www, vous pouvez simplement ajouter une instruction dans votre fichier .htaccess à la base de votre site web. Ceci va créer une redirection automatiquement sur le site en entier.

## Trouver votre fichier .htaccess

.htaccess est premièrement un fichier caché (commence avec un point) utilisé par Apache pour fournir des instructions sur le dossier courant où il se trouve et ses sous-dossiers. Si vous utiliser un logiciel FTP comme FileZilla ou Transmit, il vous faudra indiquer dans votre logiciel d’afficher les fichiers cachés.

À l’aide de votre navigateur de fichier ou logiciel FTP, naviguez à l’emplacement où se trouve votre site. Il est commun que ce soit dans un dossier nommé `public_html` ou `htdocs`. Si vous avez quelque chose de complètement différent, laissez nous savoir dans les commentaires, ce sera peut être utile.

Si vous utiliser WordPress, .htaccess va se trouver dans le dossier de base de WordPress, à côté d’autres éléments comme `wp-admin, wp-content, wp-includes, wp-config.php`.

Voici à quoi ressemble le fichier .htaccess de base de WordPress, si vous avez besoin de le rétablir.

```apacheconf
# BEGIN WordPress

RewriteEngine On RewriteRule .* - [E=HTTP_AUTHORIZATION:%
{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# END WordPress
```

Noter que le code fourni ci-bas considère que vous utilisez https. Insérez les lignes manquantes qui commencent par RewriteCond et RewriteRule avant `# END WordPress` si vous avez déjà le fichier. Sinon, il vous faudra créer le fichier `.htaccess`.

## Rediriger www vers sans-www

```apacheconf
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www.(.)$ [NC]
RewriteRule ^(.)$ https://%1/$1 [R=301,L]

```

## Rediriger sans-www vers www

```apacheconf
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www. [NC]
RewriteRule ^(.\*)$ http://www.%{HTTP_HOST}/$1 [R=301,L]

```

C’est terminé! La redirection devrait être immédiatement disponible. Tester le tout en naviguant les deux URL possible de votre site (ex.: https://www.kimdontdoit.com et https://kimdontdoit.com) et vérifier dans la barre de votre navigateur (Chrome: Cliquer deux fois la barre, car https://www va être caché par défaut).
