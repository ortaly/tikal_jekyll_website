---
layout: post
title: Building flex with RSL's modules using flex-mojos
created: 1265520617
author: itai
permalink: /devops/building-flex-rsls-modules-using-flex-mojos
tags:
- DevOps
- build maven Flex
---
<p>To create flex application that uses RSLs &quot;cross domain modules&quot; with maven, the rsl module should have two artifacts:<br />
1. The library for compilation dependency extension .swc<br />
2. The optimized library for deployment extension&nbsp; .swf<br />
<br />
Lets say we have common library that we want to use as rsl, a business module (application) that uses the common and web-ui war module, we'll have:<br />
1. common rsl :</p>
<p>&nbsp; &lt;packaging&gt;swc&lt;/packaging&gt;<br />
&nbsp; &lt;build&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;plugins&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;plugin&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.sonatype.flexmojos&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;artifactId&gt;flexmojos-maven-plugin&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;executions&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp; &lt;execution&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;goal&gt;optimize&lt;/goal&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp; &lt;/execution&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/executions&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;extensions&gt;true&lt;/extensions&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/plugin&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/plugins&gt; <br />
&nbsp; &lt;/build&gt; <br />
2. business module (application) :<br />
&nbsp; &lt;packaging&gt;swf&lt;/packaging&gt;<br />
&nbsp; &lt;plugins&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;plugin&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.sonatype.flexmojos&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;artifactId&gt;flexmojos-maven-plugin&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;extensions&gt;true&lt;/extensions&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/plugin&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/plugins&gt; <br />
&nbsp; &lt;/build&gt; <br />
&nbsp;<br />
&nbsp; &lt;dependencies&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;dependency&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;groupId&gt;com.tikal.flex&lt;/groupId&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;artifactId&gt;common-rsl&lt;/artifactId&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;type&gt;swc&lt;/type&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;scope&gt;rsl&lt;/scope&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;/dependency&gt; <br />
&nbsp; &lt;/dependencies&gt; <br />
3.&nbsp; web-ui war :</p>
<p>&nbsp; &lt;packaging&gt;war&lt;/packaging&gt; <br />
&nbsp; &lt;build&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;plugins&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;plugin&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.sonatype.flexmojos&lt;/groupId&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;artifactId&gt;flexmojos-maven-plugin&lt;/artifactId&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;version&gt;3.0.0&lt;/version&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;executions&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;execution&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;goals&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;goal&gt;copy-flex-resources&lt;/goal&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/goals&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/execution&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/executions&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;extensions&gt;true&lt;/extensions&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/plugin&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;/plugins&gt; <br />
&nbsp; &lt;/build&gt; <br />
&nbsp;<br />
&lt;dependencies&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;dependency&gt; <br />
&nbsp; &nbsp;&nbsp;&nbsp; &lt;groupId&gt;com.tikal.flex&lt;/groupId&gt; <br />
&nbsp; &nbsp;&nbsp;&nbsp; &lt;artifactId&gt;business&lt;/artifactId&gt; <br />
&nbsp; &nbsp;&nbsp;&nbsp; &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt; <br />
&nbsp; &nbsp;&nbsp;&nbsp; &lt;type&gt;swf&lt;/type&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;/dependency&gt; <br />
&lt;/dependencies&gt; <br />
<br />
The war will includes :<br />
web-ui.war/<br />
&nbsp;&nbsp;&nbsp; business-1.0-SNAPSHOT.saf<br />
&nbsp;&nbsp;&nbsp; rsl/<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; common-rsl-1.0-SNAPSHOT<br />
&nbsp;&nbsp;&nbsp; WEB-INF/<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; web.xml</p>
