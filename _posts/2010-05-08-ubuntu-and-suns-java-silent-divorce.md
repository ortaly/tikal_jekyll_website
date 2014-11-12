---
layout: post
title: 'Ubuntu and Sun''s Java silent divorce '
created: 1273312786
author: peterk
permalink: /java/ubuntu-and-suns-java-silent-divorce
tags:
- JAVA
- ubuntu Lucid Lynx sun java install
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.1  (Win32)"><style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
	-->
	</style>      </meta>
</meta>
</p>
<p>I was getting mad yesterday trying to figure out what happened to my SUN-JAVA 6 installation on my Ubuntu equipped laptop after the upgrade to the last and best Ubuntu version 10.04, so called &quot;Lucid Lynx&quot;.</p>
<p><br />
&nbsp;</p>
<p>The desktop itself is wonderful. Most beautiful thing I've ever seen. Really.</p>
<p><br />
&nbsp;</p>
<p>But suddenly all my java stuff  stopped: eclipse, maven, ant, everything, that</p>
<p>helped me to cope without marriage so far...just refused to work.</p>
<p><br />
&nbsp;</p>
<p>And you know what? Try to guess...</p>
<p><br />
&nbsp;</p>
<p>Ubuntu DELETED (ERASED, REMOVED) my SUN java 6!!!!!!!!!!!!!!!!!!!!!!!</p>
<p>It's a default behavior during the upgrade, unsupported software just removed!!!</p>
<p><br />
&nbsp;</p>
<p>You remember that sudo apt-get install sun-java6-jdk?</p>
<p><br />
&nbsp;</p>
<p>Forget about it!!!</p>
<p><br />
&nbsp;</p>
<p>New Ubuntu does not support SUN jdk and leaves that OpenJava as a single available</p>
<p>option.</p>
<p><br />
&nbsp;</p>
<p>That's sucks!!!!</p>
<p><br />
&nbsp;</p>
<p>FORTUNATELY!!!!</p>
<p><br />
&nbsp;</p>
<p>You still able to download and install the sun's (oracle's) java as a binary (.bin) and install it:</p>
<p><br />
&nbsp;</p>
<p>It works like unzip, just a package you place anywhere on your disk.</p>
<p><br />
&nbsp;</p>
<p>Then if you make changes to your PATH and JAVA_HOME and M2_HOME variables in the /etc/profile it even starts to work for your previously installed applications.</p>
<p><br />
&nbsp;</p>
<p>So , I'm still with Ubuntu, although I was 1 inch from throwing it out from my hard drive...</p>
<p>I hate when software behaves like this. I expected something like that from MS Windows, or from their IE(**KED BINGO has installed itself as default search engine even in firefox!!! no matter how many times I clicked &quot;NO&quot;!!!!), but not from the &ldquo;software of the choice&rdquo;.</p>
<p><br />
&nbsp;</p>
<p>They removed sun's JDK from all their repositories, only JRE is still there...</p>
<p><br />
&nbsp;</p>
<p>Ubuntu....Ubuntu....I start think what next....</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
