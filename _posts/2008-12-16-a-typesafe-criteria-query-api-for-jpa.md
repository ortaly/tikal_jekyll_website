---
layout: post
title: A typesafe criteria query API for JPA
created: 1229463600
author: yanai
permalink: /java/typesafe-criteria-query-api-jpa
tags:
- JAVA
- JPA
- JPA 2.0 Criteria
---
<p>Gavin King suggests a different approach to the JPA EG with regard to the new Criteria api. This approach comes in three layers:</p><ul class="wikiUnorderedList"><li class="wikiUnorderedListItem">A metamodel API for JPA</li><li class="wikiUnorderedListItem">A query API where types and attributes are specified in terms of metamodel API objects</li><li class="wikiUnorderedListItem">Support for third-party tooling which would generate a typesafe metamodel from the entity classes</li></ul><p>&nbsp;</p>
