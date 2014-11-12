---
layout: post
title: Thoughts about Coda's Scala mail
created: 1322672780
author: ittayd
permalink: /thoughts-about-codas-scala-mail
tags:
- Incubator
- Scala
---
<p>Coda Hale is Yammer's infrastructure architect. Yammer is moving their infrastructure code from&nbsp;Scala to Java. Typesafe's CEO&nbsp;(the company founded by Scala's creators)&nbsp;asked him for his reasons and his email was made public by mistake. <a href="http://codahale.com/the-rest-of-the-story/">Read more here</a></p>
<p>&nbsp;</p>
<p>I've worked for 2 years now in on a complex scalable service exposed via web-service created in Scala and my experiense was very different. Here are my thoughts.</p>
<p>&nbsp;</p>
<p>First, to summarise the main points of the email:</p>
<ol>
    <li>&nbsp;the usual argument for &quot;scala is complex&quot; is that complex       features of scala are used to write library code and &quot;normal&quot; code       is simpler. He says the complexity &quot;leaks&quot;. For example, in order to use       Scala's collections, one has to know the language features which make them work.</li>
    <li>&nbsp;the vocal part of the community advocates complex constructs       and idioms even in &quot;normal&quot; code which confuses people.</li>
    <li>&nbsp;scala advocates sbt which is not mature enough and having to       support it takes resources.</li>
    <li>&nbsp;the fact that scala releases are binary incompatible means       that if you want to upgrade the scala version, you must use those       libraries that update frequently (rather than those that are best)</li>
    <li>&nbsp;there are runtime penalties for some scala features.</li>
</ol>
<p>&nbsp;</p>
<p>My reaction is:</p>
<ol>
    <li>Where I&nbsp;work,  people didn't have much problem using       collections without understanding the exact mechanisms very well. Sort of like using collections in an untyped language: you care       how your code looks, not how the API looks</li>
    <li>In a similar vain, people didn't try to use the most advanced       features. most of what we did is write problem-solving-focused code, but the       features that scala gave made it more pleasent to write. Sometimes we used that bit of extra power that Scala gives, and then it was very benefitial</li>
    <li>We didn't use sbt and i'm against using it since it is       obviously not mature. If someone uses a tool when its version is       0.7 (currently it is 0.10), then he is asking for trouble anyway</li>
    <li>We were on 2.8.0 for a long time and didn't feel any pain of       not moving to 2.9. Only 3 weeks ago did we move and then it was       painless since all libraries have already updated. It is not a big       deal to update a library to a new scala version. mostly just       recompiling (the incompatabilities are in binary level, not source       level).</li>
    <li>Our performance is better than an older framework which was written       in Java (but a different architecture). Also see <a href="http://goo.gl/RVCAS">      http://goo.gl/RVCAS</a> and <a href="http://goo.gl/ePC5B">http://goo.gl/ePC5B</a>. The first s an article from google comparing implementation of an       algorithm in C++/Java/Scala/Go. the conclusion was that while C++       had the best performance it required a lot of very clever       optimizations while the Scala version gave good performance and       simple code and behaved better than Java.&nbsp;The second article gives an example of how a higher level library gave better productivity and performance. Furhtermore, the performance issues at Yammer       seems to come from having to use low level constructs       (serialization) with high-level language.</li>
</ol>
<p>&nbsp;</p>
<p>So, my overall conclusion is that they were aiming very high       (trying to use sbt, all sorts of complex idioms) and therefore       failed. In my work, our aim is not so high (we never discussed       things like bijective map or semi algebras). </p>
<p>&nbsp;</p>
<p>The lesson is that if a team wants to adopt Scala, they need to       not try to use every feature of the language, nor is it important       to read and understand every blog. Use the <a href="http://www.tikalk.com/java/blog/simpler-parts-scala">&quot;simpler parts&quot;</a> and       you'll be fine.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
