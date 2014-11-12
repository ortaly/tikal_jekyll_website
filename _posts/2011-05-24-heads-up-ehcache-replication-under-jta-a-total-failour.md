---
layout: post
title: 'Heads Up - EHCache replication under JTA, a total failour '
created: 1306234012
permalink: heads-up-ehcache-replication-under-jta-a-total-failour
tags:
- JAVA
- java ehcache
---
<p>lately i've been trying to use EHCache 2.x latest feature - replication under JTA.</p>
<p>the documenation is pretty coherent and easy, and I had a POC in no time.</p>
<p>here where the easy part ends...</p>
<p>&nbsp;</p>
<p>it seems that EHCache replication without JTA works fine, EHCahce JTA without replication works fine also.</p>
<p>the problem is that replication with JTA is not working, at all, under any 2.x version I've tried.</p>
<p>I've even tried every protocole that is specified in the documentation - RMI, JGroups and JMS, nothing works.</p>
<p>Here's Taylor Gautier's (Product Manager, Terracotta) response as to JTA support (<a href="http://blog.markturansky.com/archives/26">origianl post</a>) -</p>
<p><span style="color: rgb(51, 102, 255);">&quot;The Java memory model is not hooked in with JTA, and so Terracotta does  not support JTA.  If you are using JTA to write across more than one  system, and that is a hard requirement, then you might need to look  elsewhere for a while.  However, we find that most people really don&rsquo;t  need full 2pc &ndash; it&rsquo;s too slow and not really needed.  What you do need  is stable, restartable, durable memory, and Terracotta does give you  that.&quot;</span></p>
<p>&nbsp;</p>
<p>after experiencing with the latest replication-JTA support I came to the conclusion that the Terracotta team still think it's not important.</p>
<p>there's no other explanation for the poor support of this feature in 2.x verions.</p>
<p>dont get me wrong, I love EHCache and I&nbsp;think it's a great open source.</p>
<p>but since it doesn't support what it claims to (which pretty much sucks for their reputation) it's useless for my current POC.</p>
<p>hopefully the EHCache team will fix this feature (and mindset). in my opinion a replication under JTA is a greate feature for J2EE application.</p>
<p>&nbsp;</p>
<p>my next step is to check JBossCache, which claims to support this feature. POC report will follow soon...</p>
<p>&nbsp;</p>
