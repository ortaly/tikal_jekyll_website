---
layout: post
title: 'How to convert path slashes during build '
created: 1244976386
author: liya
permalink: /devops/how-convert-path-slashes-during-build
tags:
- DevOps
- Ant
---
<p>It happens many times that you need to set a property using path defined in the build process and convert slashes according to the relevant OS, and do it while coping the property file to the target directory during build.<br />
Here is a simple example how to do it with Ant:</p>
<p>let's say <em>mypath </em>is defined as &quot;module\conf\xml&quot;<br />
in your my.properties the path should appear as:<em><br />
MY_NEW_PATH=@<em>mypath</em>@/more/xxx</em></p>
<p>in your build.xml (or in pom.xml when using antrun plugin with maven):<br />
<em>&lt;pathconvert property=&quot;mypathfixed&quot; dirsep=&quot;/&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &lt;path location=&quot;${mypath}&quot;/&gt;<br />
&lt;/pathconvert&gt;<br />
&lt;copy todir=&quot;${my.target_dir}&quot; filtering=&quot;true&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;fileset dir=&quot;${basedir}/src/main/conf&quot; includes=&quot;my.properties&quot;<em>/&gt;</em><br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &lt;filterset recurse=&quot;true&quot;&gt;<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &lt;filter token=&quot;mypath&quot; value=&quot;${mypathfixed}&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/filterset&gt;<br />
&lt;/copy&gt;</em></p>
<p>copied my.properties will have your property defined as:<em><br />
MY_NEW_PATH=</em>module/conf/xml<em>/more/xxx</em></p>
<p>More useful examples how to use pathconvert: http://ant.apache.org/manual/CoreTasks/pathconvert.html</p>
