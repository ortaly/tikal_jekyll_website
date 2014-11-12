---
layout: post
title: Please upgrade to 1.492
created: 1354528343
author: hagzag
permalink: /devops/please-upgrade-1492
tags:
- DevOps
- regression
- jenkins
---
<p>Hi all,</p>
<p>I have had a serious issue I stumbled upon whilst using Jenkins 1.491 [<a href="https://issues.jenkins-ci.org/browse/JENKINS-15865">JENKINS-15865</a>&nbsp;to be specific].</p>
<p>If for any chance Maven builds which worked well until 1.491 no longer do, or more specific test do not start executing continue reading ...</p>
<p>&nbsp;</p>
<p>Running maven failsafe caused Jenkins NPE and builds were crashing with:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
...
[ERROR] FATAL ERROR
[INFO] ------------------------------------------------------------------------
[INFO] null
[INFO] ------------------------------------------------------------------------
[INFO] Trace
java.lang.NullPointerException
at org.codehaus.plexus.component.configurator.converters.ComponentValueSetter.configure
(ComponentValueSetter.java:247)
at org.codehaus.plexus.component.configurator.converters.composite.ObjectWithFieldsConverter
.processConfiguration(ObjectWithFieldsConverter.java:137)
...</pre>
<p>&nbsp;</p>
<p>An upgrade to 1.492 solves this.</p>
<p>&nbsp;</p>
<p>There were quite a few more issues but this one gave me some serious doubts on using the Latest vs. LTS for quite a few builds had become useless with no code changes internally who could of caused this.</p>
<p>&nbsp;</p>
<p>Hope you find this useful.</p>
<p>HP</p>
