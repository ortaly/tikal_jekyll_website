---
layout: post
title: That's one small step for Maven, a giant leap for Continuous Delivery
created: 1396469311
author: yorammi
permalink: /devops/thats-one-small-step-maven-giant-leap-continuous-delivery
tags:
- DevOps
- maven
- Continuous Delivery
- scm
- build
- git
---
<p>More than a decade ago, when I was first been introduced with Maven, I had one big issue with its concept:&nbsp;along side with all its benefits (and there are many as such), I didn&#39;t like the idea that for each version of my product I need to set the version of it inside the pom.xml file and save the file (with the version text inside it) as part of my code.<br />
This concept were against any understanding I have about versioning methodologies and it caused me to actually dislike Maven. Maven 3.2.1 introduced, for the first time, a&nbsp;small feature that turn all the written above upside-down.</p>

<h1>Continuous delivery friendly versions</h1>

<p><font color="#333333"><font face="Times New Roman, serif"><font size="3">By reading the&nbsp;</font></font></font><a href="http://maven.apache.org/docs/3.2.1/release-notes.html"><font color="#0782c1"><font face="Times New Roman, serif"><font size="3">release notes of version 3.2.1</font></font></font></a><font color="#333333"><font face="Times New Roman, serif"><font size="3">&nbsp;you may not notice the below naive text which doesn&#39;t really reflect the effect of the feature:</font></font></font></p>

<hr />
<p><strong><span style="color:#0000FF;"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>Continuous delivery friendly versions </i></font></font><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>(</i></font></font></span><a href="https://jira.codehaus.org/browse/MNG-5576"><span style="color:#0000FF;"><span style="text-decoration: none"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>MNG-5576</i></font></font></span></span></a><span style="color:#0000FF;"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>)</i></font></font></span></strong></p>

<p><span style="color:#0000FF;"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>A simple change to prevent Maven from emitting warnings about versions with property expressions. Allowed property expressions in versions include&nbsp;</i></font></font><tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>${revision}</i></font></font></tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>,</i></font></font><tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>${changelist}</i></font></font></tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>, and&nbsp;</i></font></font><tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>${sha1}</i></font></font></tt><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>. These properties can be set externally, but eventually a mechanism will be created in Maven where these properties can be injected in a standard way. For example you may want to glean the current Git revision and inject that value into ${sha1}. This is by no means a complete solution for continuous delivery but is a step in the right direction.</i></font></font></span></p>

<hr />
<p><font face="Times New Roman, serif"><font size="3">This &#39;simple change&#39; were added indeed to prevent the following error when you use properties as part of your version:</font></font></p>

<hr />
<p><span style="color:#0000FF;"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>The project com.xxx:yyy:${revision}-SNAPSHOT (yyy/pom.xml) has 1 error</i></font></font></span><br />
<i style="font-size: 11pt; font-family: 'Times New Roman', serif; color: rgb(0, 0, 255); line-height: 1.6em;">[ERROR] &#39;dependencies.dependency.version&#39; for com.xxx:zzz:jar must be a valid version but is &#39;${revision}-SNAPSHOT&#39;.</i></p>

<hr />
<h1>Giant leap...</h1>

<p><font face="Times New Roman, serif"><font size="3">But now - since Maven 3.2.1 - you can AT LAST put such properties inside your pom.xml files and enable passing the value of it as build argument.</font></font></p>

<p><font face="Times New Roman, serif"><font size="3">Here&#39;s an example of how I&#39;ve used it (successfully):</font></font></p>

<hr />
<p><span style="color:#0000FF;"><font face="Times New Roman, serif"><font style="font-size: 11pt"><i>-&nbsp;mvn versions:set versions:update-child-modules -DnewVersion=1.0-$\{revision\}-SNAPSHOT</i></font></font></span><br />
<i style="font-size: 11pt; font-family: 'Times New Roman', serif; color: rgb(0, 0, 255); line-height: 1.6em;">-&nbsp;mvn install -Drevision=B111</i></p>

<hr />
<p><font face="Times New Roman, serif"><font size="3">​</font></font><font face="Times New Roman, serif"><font size="3">The build produces artifacts versioned as 1.0-B111-SNAPSHOT without changing the pom.xml files so there is no code change.</font></font></p>

<h1>So what?</h1>

<p><span style="font-size: medium; font-family: 'Times New Roman', serif; line-height: 1.6em;">At first look, this may look as a small change, but it is indeed -&nbsp;as titled in the release notes - continuous delivery (and much more) friendly feature.</span></p>

<p><font face="Times New Roman, serif"><font size="3">At last we don&#39;t need to find workaround for automating the version string and the SCM which comes as a result of it.</font></font></p>

<p><br />
&nbsp;</p>

<hr />
<p><font face="Times New Roman, serif"><font size="3">Yoram Michaeli&nbsp;</font></font></p>

<p><font face="Times New Roman, serif"><font size="3">@yorammi</font></font></p>

<p><font face="Times New Roman, serif"><font size="3">yorammi@tikalk.com</font></font></p>

<p><br />
&nbsp;</p>

<p><br />
<br />
&nbsp;</p>
