---
layout: post
title: Second level cache
created: 1241079341
permalink: second-level-cache
tags:
- JAVA
- jboss hibernate cache
---
<p>I tried to configure usage of second level cache for Hibernate under JBoss.</p>
<p>I tried EH Cache configuration and Hibernate-jboss configuration. However, in both cases logging of org.hibernate.SQL has produced multiple records when activating NamedQuery multiple times.</p>
<p>I also added QueryHint org.hibernate.cacheable=true to the query, but that didn't help either.</p>
<p>How can i verify that cache is working and objects are cached ?</p>
<p>(cache log showed that cache has been initialized at a region with my EAR file)</p>
