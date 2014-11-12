---
layout: post
title: A question from the Java Inquisition
created: 1266146995
permalink: a-question-from-the-java-inquisition
tags:
- JAVA
- Generics
---
<p>http://enigma.vm.bytemark.co.uk/inquisition/index.php/Main_Page</p>
<p>&nbsp;</p>
<p>Try it. </p>
<p>&nbsp;</p>
<p>Whats wrong here? </p>
<p>&nbsp;</p>
<p>&nbsp;public static void main(String... args)<br />
&nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ArrayList a = new ArrayList();<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a.add(&quot;Wohow someone smells stinky!&quot;);<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a.add(5);<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ArrayList&lt;Integer&gt; biebabeloeba = a;</p>
<p><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(biebabeloeba.get(1));<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(biebabeloeba.get(0));<br />
&nbsp;&nbsp;&nbsp; }</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Does this compile ? (answer YES). </p>
<p>Does it throw an  exception during runtime (answer NO). </p>
