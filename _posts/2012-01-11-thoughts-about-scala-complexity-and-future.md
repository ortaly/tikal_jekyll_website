---
layout: post
title: Thoughts about Scala complexity and future
created: 1326298695
author: ittayd
permalink: /thoughts-about-scala-complexity-and-future
tags:
- Incubator
- Scala
---
<p>It looks like the recent trend is <a href="http://blog.joda.org/2011/11/scala-feels-like-ejb-2-and-other.html">blogging</a> <a href="http://codahale.com/the-rest-of-the-story/">about</a> <a href="http://yz.mit.edu/wp/true-scala-complexity/">scala-complexity</a>. I&nbsp;thought of writing my own view of things.</p>
<p>&nbsp;</p>
<h2>Mixing up complexity and limits</h2>
<p>Scala has its limits. Some things cannot be done easily. The thing about Scala is that it makes people believe they can do anything with it, they are then frustrated when they can't. The <a href="http://yz.mit.edu/wp/true-scala-complexity/">scala-complexity</a> blog post for example, tries to create a method that will work on collections, Java's strings and Java's arrays. Seamlessly. This is something you wouldn't even dream of doing in Java (Note:&nbsp;<a href="https://gist.github.com/f83892f65f63b14a1f75">it is in fact possible to do it</a>.)</p>
<p>&nbsp;</p>
<p>This is both good and bad. It shows&nbsp; that Scala is a great language, since it makes people believe they can do extraordinary things with it. On the flipside, doing such things requires intimate knowledge of the language, and the resulting solution is not trivial.&nbsp;Somehow, people expect they can do anything with the language and are frustrated when some stuff is not trivial.</p>
<p>&nbsp;</p>
<h2>A&nbsp;Toolbox</h2>
<p>Scala allows to use many idioms of programming. Using operators for math like code is one, functional programming is another. This is different from the Java design which tried to constraint people and make it hard to shoot oneself in the leg. </p>
<p>&nbsp;</p>
<p>But a toolbox means you need to know to choose the right tool for the job. Coda's team, for example, apparently tried to use every new thing they encountered in their current task. This of course is bound to fail. The Java ecosystem produced a lot of great libraries. Does it mean you try to use each new one you encounter in your product?&nbsp;Of course not, it would be a lousy product if you did!</p>
<p>&nbsp;</p>
<h2>Scala *is*&nbsp;complex</h2>
<p>Scala is complex. That complexity arises from the simplicity of its spec. Martin Odersky managed to create a log of small features that are able to &quot;play together&quot;&nbsp;nicely. This means many combinations can created from them, some of them complex. </p>
<p>&nbsp;</p>
<p>For example, try explaining how the next piece of code works:</p>
<pre title="code" class="brush: scala;">
List(1,2) match {
  case a :: b =&gt; println(&quot;success&quot;)
}</pre>
<p>&nbsp;</p>
<p>This involves explaining:</p>
<ul>
    <li>companion objects</li>
    <li>apply() as function application</li>
    <li>extractors (which involves explaining Option)</li>
    <li>infix types</li>
</ul>
<p>&nbsp;</p>
<p>These are the same reasons why functional programming is complex. A lot of small ideas playing in concert to create larger constructs.</p>
<p>&nbsp;</p>
<p>I&nbsp;liked this tweet from @dibblego:&nbsp;&quot;1. e4 e5 2. Nf3 Black resigns (too much complexity)&quot;</p>
<p>&nbsp;</p>
<p>I&nbsp;think for some people something is simple if the basic ideas are simple. For others, simplicity is how many parts are in the final structure. An example is git, which has a very simple low-level structure, but appears complex to many.</p>
<p>&nbsp;</p>
<p>The question for people from the second group, is whether learning Scala is worth the effort. My view about this is that most of the time the learning is worth it. The language you use is the most basic element, once you've learned a new idiom/feature, you can use that knowledge a lot of times. </p>
<p>&nbsp;</p>
<h2>What to do about all this?</h2>
<p>Well, the solution I&nbsp;believe is self management. Don't try to learn/use all features/idioms of the language. 80% of the time, you'll be using 20% of them. This is natural and happens always. In those 20% cases where you need Scala's &quot;complex&quot;&nbsp;features, invest the time to do it right. Those 20% are supposed to be the areas where you think you'd actually gain something for your investment.&nbsp;</p>
<p>&nbsp;</p>
<p>I've worked for two years in Scala. We were productive within a week. This is because people did not care to use every bit of language system, and instead focused on getting the product out. Immediate gains from type inference, case classes and the like meant we immediately saw the benefits of Scala and then as time progressed, learned more and more of the language and what can be done with it. </p>
<p>&nbsp;</p>
<h2>Scala's future</h2>
<p>Will Scala's&nbsp; market share increase in the future?&nbsp;I&nbsp;actually doubt it. Because the 80-20% rule applies here also. For 80% of the applications/libraries out there, Scala's features will not make much difference. In particular, your typical&nbsp; spring-hibernate web application works just fine without Scala. This is because there's not much in terms of actual logic, most of the work is managing DB records and integrating with other frameworks (this is not a putdown on Java, I&nbsp;believe the same situation exists in Rails and Django). The truth is that programming has become commodity, and most applications don't require a great deal of sophistication. Of course you get some benefits from type inference and the like, but not much.</p>
<p>&nbsp;</p>
<p>Is it good or bad?&nbsp;I&nbsp;actually think it is good for Scala. Scala will find its niche in those application where there's sophisticated business logic and algorithms (e.g., the financial market). It will always be a viable option because while using Scala you can use all the great Java libraries out there. Because it will not be a part of the EE&nbsp;eco system, it will have a chance to grow and improve and stay creative. </p>
<p>&nbsp;</p>
<p>What worries me is Typesafe. As a company, it no doubtly want to increase its market share. One way that Odersky sems to consider &quot;dumb&quot;&nbsp;down Scala, so it can be used instead of Java without the &quot;complexity&quot;&nbsp;baggage. I&nbsp;think this will fail since those places do not require more than Java and even if they want a bit of closures/functions, they will get them from Ceylone/Kotlin/Java8. But going down that road means starting to think like the creators of Java and creating a language for average programming. If that happens, then Scala will have no chance against Java and will die.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<br />
<h2>&nbsp;</h2>
