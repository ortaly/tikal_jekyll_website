---
layout: post
title: JBoss Performance Tuning Tips
created: 1251040742
author: elad
permalink: /java/jboss-performance-tuning-tips
tags:
- JAVA
- jboss
- Prepared Statement Cache
- PoolInvoker
---
<p><span id="1251039774202S" style="display: none;">&nbsp;</span></p>
<div><span id="1251039770260S" style="display: none;">&nbsp;</span><span id="1251039766641S" style="display: none;">&nbsp;</span></div>
<div>This article contains some tips regarding JBoss performance tuning:</div>
<div><a href="http://www.mastertheboss.com/en/jboss-application-server/113-jboss-performance-tuning-1.html">JBoss Performance Tuning part 1</a></div>
<div><a href="http://www.mastertheboss.com/en/jboss-server/130-jboss-performance-tuning-part-2.html">JBoss Performance Tuning part 2</a></div>
<div>&nbsp;</div>
<div><span id="1251039766418E" style="display: none;">&nbsp;</span>Some of the tips concern with tuning the JVM options, and for this I would to start here:</div>
<div><a href="http://www.tikalk.com/java/blog/new-book-pro-java-ee-5-performance-management-and-optimization">http://www.tikalk.com/java/blog/new-book-pro-java-ee-5-performance-management-and-optimization</a></div>
<div>&nbsp;</div>
<div>Other tips have specific relevance to JBoss, and here are the tips I recommend to implement:</div>
<ul>
    <li>Tip 15: Switch to the PoolInvoker</li>
    <li>Tip 17: Disable the hot deployer in production (in case you don't use hot-deployment)</li>
    <li>Tip 21: Use Prepared Statement Cache</li>
    <li>Tip 22: Remove services you don't need</li>
    <li>&nbsp;</li>
</ul>
<div>For tip 22, I wrote in the past a guide explaining which services can be slimmed from Jboss:</div>
<div><a href="http://www.tikalk.com/jbug/slimming-and-tuning-jboss-405-customer">slimming JBoss 4.0.5 services</a></div>
<div><span id="1251039766418E" style="display: none;"><br />
</span><span id="1251039769502E" style="display: none;">&nbsp;</span></div>
<p><span id="1251039773963E" style="display: none;">&nbsp;</span></p>
<p>&nbsp;</p>
