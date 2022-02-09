---
template: single-post
title: Comment utiliser componentWillUnmount dans un Functional Component
publish_date: 2022-02-07T03:31:17.313Z
authors:
  - Vladislav Kim
category: JavaScript
type: Snippets
needs_update: true
---

```js
useEffect(() => {
  return () => {

  // Anything in here is fired on component unmount.

  };
}, \[]);
```
