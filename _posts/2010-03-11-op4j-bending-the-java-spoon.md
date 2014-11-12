---
layout: post
title: 'op4j: bending the java spoon'
created: 1268319972
author: ittayd
permalink: /java/op4j-bending-java-spoon
tags:
- JAVA
- functional_programming
---
<p>&nbsp;<span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "><a href="http://www.op4j.org/">http://www.op4j.org/</a>&nbsp;</span></p>
<p>&nbsp;</p>
<p>from the site:</p>
<p><span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, Arial, sans-serif; line-height: normal; font-size: 13px; ">
<p style="line-height: 1.3em; font-size: small; "><b>op4j</b>&nbsp;(pronounced&nbsp;<i>['op-ah]</i>)&nbsp;<b>is a developer happiness tool</b>. It is a Java library aimed at&nbsp;<b>improving quality, semantics, cleanness and readability of Java code</b>, especially auxiliary code like data conversion, structure iteration, filtering, mapping, etc.</p>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>Examples of code are:</div>
<div>&nbsp;</div>
<pre title="code" class="brush: java;">
Set&lt;Calendar&gt; set =         
 Op.on(list).toSet().forEach().exec(FnString.toCalendar(&quot;dd/MM/yyyy&quot;)).get();</pre>
</span></p>
<p>&nbsp;</p>
<p>Which converts a list of string to a set of Calendar objects</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
