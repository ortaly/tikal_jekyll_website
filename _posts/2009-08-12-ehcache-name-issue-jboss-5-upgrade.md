---
layout: post
title: EhCache name issue -jboss 5 upgrade
created: 1250062175
permalink: ehcache-name-issue-jboss-5-upgrade
tags:
- JAVA
- EhCache
---
<p>I am facing a very strange issue with respect to the cache names referenced by the EhCache module under jboss5. It is pre-pending the word &quot;true&quot; before my cache names and hence they can no be found:</p>
<p>&nbsp;</p>
<p>&quot;starting query cache at region: <strong>true</strong>.org.hibernate.xxx.yyy &quot;</p>
<p>&nbsp;</p>
<p>and also:</p>
<p>&nbsp;</p>
<p>&quot;Could not find a specific ehcache configuration for cache named true.com.xxx.yyy.xxx.userList]; using defaults.</p>
<p>&nbsp;</p>
<p>Has anyone faced a similar issue and was able to resolve it?</p>
<p>&nbsp;</p>
<p>No Google references please unless trhere is an answer there, thank you. &nbsp; </p>
