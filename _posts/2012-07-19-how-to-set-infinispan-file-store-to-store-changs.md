---
layout: post
title: How to set Infinispan File store to store changs?
created: 1342699830
author: alonm
permalink: /how-set-infinispan-file-store-store-changs
tags:
- JAVA
- java cache infinispan
---
<p>When I use the following&nbsp;configuration , the cache creates a file when the object is created</p>
<p>but not when I change it :-(</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp; &lt;namedCache name=&quot;my cache<br />
&lt;loaders passivation=&quot;false&quot; shared=&quot;false&quot; preload=&quot;true&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;loader class=&quot;org.infinispan.loaders.file.FileCacheStore&quot; fetchPersistentState=&quot;true&quot;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ignoreModifications=&quot;false&quot; purgeOnStartup=&quot;false&quot;&gt;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;properties&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;property name=&quot;location&quot; value=&quot;/usr/cache&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/properties&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/loader&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/loaders&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/namedCache&gt;<br />
&nbsp;</p>
<p>I also tried adding</p>
<p>&lt;property name=&quot;fsyncMode&quot; value=&quot;perWrite&quot;/&gt;</p>
<p>still didnot work</p>
<p>Any ideas ?</p>
<p>&nbsp;</p>
