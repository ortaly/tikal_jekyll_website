---
layout: post
title: TECHO - ANT ECHO task with timestamp
created: 1385380695
author: yorammi
permalink: techo-ant-echo-task-with-timestamp
tags:
- DevOps
- Ant
---
<p>I often find myself writing ANT script which I need to measure times in it.</p>

<p>I can write ANT task&nbsp;for that and include it in my project (I have such task but it will not be in the scope of that post), but it will require me to add files to the source control, manage the build and deployment of the tasks-jar and more while what I want is a quick solution that will not go beyond the scope of my build.xml script.</p>

<p>The quick solution I have for the above requirements is to add a&nbsp;<strong>scriptdef</strong>&nbsp;for a script called&nbsp;<strong>TECHO</strong> that will wrap the&nbsp;<strong>ECHO&nbsp;</strong>task and will able to add a timestamp signiture to the printed message.</p>

<p>For example, if the following&nbsp;<strong>echo</strong>&nbsp;instance will display the text as displayed below it:</p>

<pre>
&lt;echo message=&quot;Print this text&quot;/&gt;</pre>

<p>output:</p>

<pre>
[echo] Print this text</pre>

<p>The matching&nbsp;<strong>techo</strong> instance will result as follow:</p>

<pre>
&lt;techo message=&quot;Print this text&quot;/&gt;</pre>

<p>output:</p>

<pre>
[echo] Print this text [25/11/2013 13:26:48]</pre>

<p>You can of course use <a href="http://ant-contrib.sourceforge.net/tasks/tasks/stopwatch_task.html">Ant-contrib-stopwatch</a>&nbsp;for the same purpose but this will require you to include the antcontrib jar in your build environment and track the stop-watches, while my suggested solution will only provide timestamps printputs.</p>

<p>All you need is to add the below definition in the build.xml file header:</p>

<pre class="p1">
<span class="s2" style="white-space: pre-wrap; line-height: 1.6em;">&lt;</span><span class="s3" style="white-space: pre-wrap; line-height: 1.6em;">scriptdef</span><span class="s1" style="white-space: pre-wrap; line-height: 1.6em;"> </span><span class="s4" style="white-space: pre-wrap; line-height: 1.6em;">name</span><span class="s1" style="white-space: pre-wrap; line-height: 1.6em;">=</span><span style="white-space: pre-wrap; line-height: 1.6em;">&quot;techo&quot;</span><span class="s1" style="white-space: pre-wrap; line-height: 1.6em;"> </span><span class="s4" style="white-space: pre-wrap; line-height: 1.6em;">language</span><span class="s1" style="white-space: pre-wrap; line-height: 1.6em;">=</span><span style="white-space: pre-wrap; line-height: 1.6em;">&quot;javascript&quot;</span><span class="s2" style="white-space: pre-wrap; line-height: 1.6em;">&gt;
</span><span style="white-space: pre-wrap; line-height: 1.6em;"> </span><span class="s2" style="white-space: pre-wrap; line-height: 1.6em;">&lt;</span><span class="s3" style="white-space: pre-wrap; line-height: 1.6em;">attribute</span><span style="white-space: pre-wrap; line-height: 1.6em;"> </span><span class="s4" style="white-space: pre-wrap; line-height: 1.6em;">name</span><span style="white-space: pre-wrap; line-height: 1.6em;">=</span><span class="s5" style="white-space: pre-wrap; line-height: 1.6em;">&quot;message&quot;</span><span class="s2" style="white-space: pre-wrap; line-height: 1.6em;">/&gt;</span>

<span style="line-height: 1.6em;">&lt;![CDATA[
</span><span style="line-height: 1.6em;">function getTimeStamp() {
</span><span style="line-height: 1.6em;">    var now = new Date();
</span><span style="line-height: 1.6em;">    return ((now.getDate()) + &#39;/&#39; +
</span><span style="line-height: 1.6em;">             (now.getMonth() + 1) + &#39;/&#39; +
</span><span style="line-height: 1.6em;">             now.getFullYear() + &quot; &quot; +
</span><span style="line-height: 1.6em;">             now.getHours() + &#39;:&#39; +
</span><span style="line-height: 1.6em;">             ((now.getMinutes() &lt; 10)
</span><span style="line-height: 1.6em;">                 ? (&quot;0&quot; + now.getMinutes())
</span><span style="line-height: 1.6em;">                 : (now.getMinutes())) + &#39;:&#39; +
</span><span style="line-height: 1.6em;">             ((now.getSeconds() &lt; 10)
</span><span style="line-height: 1.6em;">                 ? (&quot;0&quot; + now.getSeconds())
</span><span style="line-height: 1.6em;">                 : (now.getSeconds())));
</span><span style="line-height: 1.6em;">}
</span><span style="line-height: 1.6em;">    tstamp = getTimeStamp();
</span><span style="line-height: 1.6em;">    self.log(attributes.get(&quot;message&quot;) +&quot; [&quot;+tstamp+&quot;]&quot;);
</span><span style="line-height: 1.6em;">]]&gt;
</span><span class="s2" style="line-height: 1.6em;">&lt;/</span><span style="line-height: 1.6em;">scriptdef</span><span class="s2" style="line-height: 1.6em;">&gt;</span></pre>

<p class="p5">Enjoy!</p>

<p class="p5">&nbsp;</p>
