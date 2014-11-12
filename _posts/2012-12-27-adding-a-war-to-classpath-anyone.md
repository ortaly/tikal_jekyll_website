---
layout: post
title: Adding a war to classpath anyone ?
created: 1356618950
author: hagzag
permalink: /devops/adding-war-classpath-anyone
tags:
- DevOps
- maven-war-plugin
- maven-warpath-plugin
---
<p>Hi,&nbsp;</p>
<p>I have an automation project which requires certain calasses from one of the project wars.</p>
<p>&nbsp;</p>
<p>If all fails I know I could:</p>
<ol>
    <li>produce a jar from the same project ...&nbsp;</li>
    <li>unpack dependecies and appent to classpath</li>
</ol>
<p>&nbsp;</p>
<p>Our automation team have been trying to add the war as a dependency and expected it to be appended to the classpath, but really what is needed is the WEB-INF/classes directory.</p>
<p>&nbsp;</p>
<p style="direction: ltr;">I've tried &quot;playing&quot; with the &quot;<span style="background-color: transparent; color: rgb(128, 0, 0); font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif; line-height: 18px;">maven-warpath-plugin&quot;</span> with no luck see usage @: http://static.appfuse.org/maven-warpath-plugin/usage.html</p>
<p style="direction: ltr;">Addin this to the project pom:</p>
<pre title="code" class="brush: xhtml;">
&lt;build&gt;
  &lt;plugins&gt;
    &lt;plugin&gt;
      &lt;groupId&gt;org.appfuse&lt;/groupId&gt;
      &lt;artifactId&gt;maven-warpath-plugin&lt;/artifactId&gt;
      &lt;version&gt;2.1.0&lt;/version&gt;
      &lt;extensions&gt;true&lt;/extensions&gt;
      &lt;executions&gt;
        &lt;execution&gt;
          &lt;goals&gt;
            &lt;goal&gt;add-classes&lt;/goal&gt;
          &lt;/goals&gt;
        &lt;/execution&gt;
      &lt;/executions&gt;
    &lt;/plugin&gt;
  &lt;/plugins&gt;
&lt;/build&gt;</pre>
<p style="direction: ltr;">&nbsp;</p>
<p style="direction: ltr;">And the required dependecies yield nothing but exceptions:</p>
<pre title="code" class="brush: xhtml;">
&lt;dependency&gt;
    &lt;groupId&gt;my.org&lt;/groupId&gt;
    &lt;artifactId&gt;myrequired.war&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;type&gt;war&lt;/type&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;my.org&lt;/groupId&gt;
    &lt;artifactId&gt;myrequired.war&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;type&gt;warpath&lt;/type&gt;
&lt;/dependency&gt;</pre>
<p style="direction: ltr;">&nbsp;</p>
<p style="direction: ltr;">Any ideas / suggestions are welcome.</p>
<p style="direction: ltr;">Thanks</p>
