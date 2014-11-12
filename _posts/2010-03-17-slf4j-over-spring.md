---
layout: post
title: SLF4J over Spring
created: 1268827584
author: itaip
permalink: /java/slf4j-over-spring
tags:
- JAVA
- Spring
- slf4j
- Logging
---
<p>&nbsp;SLF4J is a cleaner dependency and more efficient at runtime than commons-logging because it uses</p>
<p>
<meta http-equiv="content-type" content="text/html; charset=utf-8" /><span class="Apple-style-span" style="font-family: 'Times New Roman'; line-height: normal; font-size: medium; ">
<div style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 75%; font-weight: normal; line-height: 160%; background-color: rgb(255, 255, 255); ">
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">compile-time bindings instead of runtime discovery of the other logging frameworks it integrates.</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">So to use SLF4J with Spring you need to replace the commons-logging dependency with the SLF4J-JCL bridge in all the Spring jars that it appear. Once you have done that then logging calls from within Spring will be translated into logging calls to the SLF4J API</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">pom.xml example:</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<pre title="code" class="brush: xhtml;" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; ">
&lt;!-- Spring artifacts --&gt;
&lt;dependency&gt;
  &lt;groupId&gt;org.springframework&lt;/groupId&gt;
  &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
  &lt;version&gt;${spring.version}&lt;/version&gt;
  &lt;exclusions&gt;
    &lt;exclusion&gt;
      &lt;groupId&gt;commons-logging&lt;/groupId&gt;
      &lt;artifactId&gt;commons-logging&lt;/artifactId&gt;
    &lt;/exclusion&gt;
  &lt;/exclusions&gt;
&lt;/dependency&gt;
&hellip;

&lt;!-- Logging Artifacts --&gt;
&lt;dependency&gt;
  &lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;
  &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
  &lt;version&gt;${slf4j.version}&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
  &lt;artifactId&gt;slf4j-log4j12&lt;/artifactId&gt;
  &lt;version&gt;${slf4j.version}&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
  &lt;artifactId&gt;jcl-over-slf4j&lt;/artifactId&gt;
  &lt;version&gt;${slf4j.version}&lt;/version&gt;
&lt;/dependency&gt;</pre>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0in; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">In this example i bind slf4j to &nbsp;log4j.&nbsp;</p>
</div>
</span></p>
