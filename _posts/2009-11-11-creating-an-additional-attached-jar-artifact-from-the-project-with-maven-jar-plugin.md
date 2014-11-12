---
layout: post
title: Creating an additional attached jar artifact from the project with maven-jar-plugin
created: 1257967935
author: liya
permalink: /devops/creating-additional-attached-jar-artifact-project-maven-jar-plugin
tags:
- DevOps
---
<p><!--{12579677261690}--><!--{12579677261691}--></p>
<p style="font-family: tahoma,sans-serif;"><style type="text/css">
<!--{12579677261692}-->
</style></p>
<!--{12579677261693}-->
<p style="font-family: tahoma,sans-serif;"><font size="2">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">       I need to create 2 jars for my module - although it is not considered to be a &quot;good practice&quot;, this is a client request.<o:p></o:p><br />
One jar with some api classes and the default one with the rest of the classes.<o:p></o:p><br />
I tried to configure it using maven-jar-plugin using example from http://maven.apache.org/plugins/maven-jar-plugin/usage.html<o:p></o:p></meta>
</meta>
</meta>
</meta>
</font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">so my plugin configuration looks like this:<o:p></o:p> <o:p></o:p><o:p></o:p></font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;plugin&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;artifactId&gt;maven-jar-plugin&lt;/artifactId&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;include&gt;com/xxx/yyy/zzz/**/*&lt;/include&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;excludes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;exclude&gt;com/xxx/yyy/zzz/**/*StubImpl.class&lt;/exclude&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/excludes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;executions&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;execution&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;id&gt;stub-jar&lt;/id&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;phase&gt;package&lt;/phase&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;goal&gt;jar&lt;/goal&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/goals&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;classifier&gt;stub&lt;/classifier&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;include&gt;com/xxx/yyy/zzz/**/*StubImpl.class&lt;/include&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/includes&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/configuration&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/execution&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/executions&gt;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &lt;/plugin&gt;<o:p></o:p><o:p></o:p></font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">The result is that the default jar comes out as expected, and the stub jar comes out without classes at all.<o:p></o:p><br />
In the debug log i can see that the exclude parameter is not initialized when creating the stub jar, so include and exclude are equal-&gt; results with no classes.. I tried putting empty &lt;exclude&gt;, it didn&rsquo;t help.<o:p></o:p></font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">If I configure these 2 jars as 2 executions of maven-jar-plugin, the default jars &ldquo;ignores&rdquo; include/exclude configuration and just includes everything under target/classes, and the stub jars comes out ok.<o:p></o:p></font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">Am I missing something here?.. <o:p></o:p></font></p>
<p style="font-family: tahoma,sans-serif;"><font size="2">(Do the same thing with antrun plugin and then attach the artifact is my last option..<o:p> <br />
</o:p></font></p>
<p style="font-family: tahoma,sans-serif;" class="MsoNormal"><font size="2"><o:p>&nbsp;</o:p></font></p>
