---
template: single-post
title: Traduire n’importe quel mot ou string avec le filtre gettext
publish_date: 2021-12-19T05:10:43.105Z
authors:
  - Vladislav Kim
category: WordPress
---
Je vous assure, traduire WordPress, j’en ai vu de toutes les couleurs. Peu importe l’extension que vous utilisez, que ce soit WPML, TranslatePress ou une autre des (nombreuses) solutions disponibles qui aborde la traduction WordPress de manière, et je vous confirme, TRÈS différente l’une de l’autre (ahem, MultilingualPress…), avec l’accumulation de code et d’extensions, il se peut qu’un mot ou une phrase décide de ne pas s’entendre avec vous.

En tout cas, c’était le cas pour moi où certaines strings ne traduisaient pas comme je le désirais.

Un autre cas est : si votre site est disponible en une seule langue et que vous voulez traduire certains mots sans passer par une extension. Dans ce cas, je vous invite à creuser dans ces quelques lignes de code, le filtre [`gettext`](https://developer.wordpress.org/reference/hooks/gettext/).

```php
<?php

add_filter( 'gettext', 'translate_strings', 20, 3 );
function translate_strings($translated, $original, $domain) {
	if ($domain == 'woocommerce') {
		if ($original == 'Store' ) {
			$translated = 'Exposition';
		} else if($original == 'General Setting') {
			$translated = 'Paramètres';
		}
	}

	return $translated;
}
```