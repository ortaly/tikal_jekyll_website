---
layout: post
title: Lazy vs. Non-Lazy (eager) Relationships in Hibernate
created: 1226476842
permalink: lazy-vs-non-lazy-eager-relationships-in-hibernate
tags:
- JAVA
- Hibernate
- eager
- lazy
---
<p>Hi,</p> <p>Scenario:</p> <p>We are using a Richfaces tree (see http://livedemo.exadel.com/richfaces-demo/richfaces/tree.jsf) which allows &quot;drilling down&quot;, editing, etc of entities in the system (using events and observers) which are supposed to be reflected back immediately in the tree.</p> <p>The back end is using seam and Hibernate with most of the relationships using eager fetch strategy.</p> <p>Problem:</p> <p>We are facing slow response times on the browser while building the tree (of course this is related to the slow response of the back end) since we are loading each entity and all its associated objects on each mouse click (see http://www.basilv.com/psd/blog/2008/avoid-non-lazy-relationships-in-hibernate)</p> <p>Questions:</p> <p>Has anyone&nbsp; faced the same scenario/problem?</p> <p>did moving to lazy load strategy resolved the issue?</p> <p>does any one have a good working example of loading partial tree branches as a response to events?</p> <p>Thanks,</p> <p>&nbsp;</p> <p>&nbsp;</p>
