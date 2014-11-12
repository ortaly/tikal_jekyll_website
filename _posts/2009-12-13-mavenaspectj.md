---
layout: post
title: Maven+AspectJ
created: 1260691340
permalink: mavenaspectj
tags:
- JAVA
- aspectj
---
<p>Hi,</p>
<p>&nbsp;</p>
<p>I faced a problem using using <a href="http://mojo.codehaus.org/aspectj-maven-plugin/">AspectJ compiler Maven Plugin.&nbsp; </a>After hours of googling I didn't manage to make it work for my aspects, however my AJDT eclipse pluging compiles and works with aspects perfectly.</p>
<p>&nbsp;</p>
<p>While running maven i get such warning:</p>
<p>[WARNING] advice defined in test.package.MyTest$TestAspects has not been applied [Xlint:adviceDidNotMatch]</p>
<p>&nbsp;</p>
<p>pom.xml:</p>
<p>&lt;plugins&gt;<br />
***<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;plugin&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;artifactId&gt;aspectj-maven-plugin&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;version&gt;1.2&lt;/version&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;source&gt;1.6&lt;/source&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;complianceLevel&gt;1.6&lt;/complianceLevel&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;include&gt;**/*.java&lt;/include&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;executions&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;execution&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;goal&gt;test-compile&lt;/goal&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/execution&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/executions&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;dependencies&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/dependencies&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/plugin&gt;<br />
***<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/plugins&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/build&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;dependencies&gt;<br />
***<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;dependency&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.aspectj&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;artifactId&gt;aspectjweaver&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;version&gt;1.6.5&lt;/version&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/dependency&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;dependency&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.aspectj&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;artifactId&gt;aspectjrt&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;version&gt;1.6.5&lt;/version&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;type&gt;jar&lt;/type&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;scope&gt;compile&lt;/scope&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/dependency&gt;</p>
<p>***<br />
&nbsp;&nbsp;&nbsp; &lt;/dependencies&gt;</p>
<p>&nbsp;</p>
<p>Aspect:</p>
<p>@Aspect<br />
&nbsp;&nbsp;&nbsp; static class TestAspects{<br />
<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; @Pointcut(&quot;call(String some.package.PropertyProvider.getStringProperty())&quot;)<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; public void interceptStringProperty(){}<br />
&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; @Around(&quot;interceptStringProperty()&quot;)<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; public String interceptConstructorForStringProperty()<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return &quot;Intercepted String Property&quot;;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp; }</p>
<p>&nbsp;</p>
<p>Can anybody help me?</p>
<p>&nbsp;</p>
<p>Thanks.</p>
