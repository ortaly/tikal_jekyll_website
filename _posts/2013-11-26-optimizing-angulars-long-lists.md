---
layout: post
title: Optimizing Angular's Long Lists
created: 1385497053
author: orenf
permalink: optimizing-angulars-long-lists
tags:
- JS
- angular.js
- Javascript
- optimize
---
<p>Often, there&#39;s a need to optimize long list rendering with angular. This is due to many event listeners (known as &quot;watch&quot; expressions) defined in directives or as part of the data-binding features.</p>

<p>This article suggests various solutions and ways to deal with slow rendering and boost performance.</p>
