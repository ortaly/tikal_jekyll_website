---
layout: post
title: '[link] ORM is an anti-pattern'
created: 1308169437
author: ittayd
permalink: /link-orm-anti-pattern
tags:
- ORM
---
<p>http://seldo.com/weblog/2011/06/15/orm_is_an_antipattern</p>
<p>&nbsp;</p>
<p>The author lists why using an ORM&nbsp;is bad and provides some alternatives.&nbsp; </p>
<p>&nbsp;</p>
<p>I think the same for all points that he makes. The rule of thumb for me:&nbsp;don't abstract an abstraction. SQL&nbsp;is an abstraction for handling relational data. Coercing it to an OO abstraction means we loose at both ends. There are other areas such as this. E.g., coercing Javascript's prototype based model to OO by various frameworks. </p>
