---
layout: post
title: Is Java a functional language?
created: 1260879861
author: ittayd
permalink: /java/java-functional-language
tags:
- JAVA
---
<p>UPDATE: edited to make my meaning clearer (I hope). </p>
<p>&nbsp;</p>
<p>Disclaimer: This post is about my opinion, not formal definitions. </p>
<p>&nbsp;</p>
<p>In today's introduction to the Scala course. Adi asked what is functional programming. Here is Wikipedia's definition:</p>
<p class="rteindent1">In computer science, functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids state and mutable data</p>
<p class="rteindent1">&nbsp;</p>
<p>What is FP good for? It allows better reasoning about an application: when you see a function call, you can be sure that it doesn't mutate any global variables. It also means that once you call a function with a value and it returned a result, you can be sure it will return the same result given the same value (so it doesn't read any global state). It means you can pass functions around and know they'll perform the same, you can evaluate them in parallel and know they won't interfere with each other. It also means composition of functions into larger computations without worry. Finally, variables cannot change, so once you know the value of x it stays that way. Goodness </p>
<p>&nbsp;</p>
<p>So can we use FP in Java? Surely I can avoid state and mutable data in Java. Just check out the <a href="http://java.sun.com/javase/6/docs/api/java/lang/Math.html">Math</a> class. Lots of mathematical functions there. Also, languages that are considered functional, like Scala, Lisp, Ruby, Python, allow mutation of state, so what is the difference? </p>
<p>&nbsp;</p>
<p>For me, the lack of functions as values is what makes the difference.</p>
<p>&nbsp;</p>
<p>For example, lets say that I have a person class with name and age and I wish to partition a collection of persons based on adults and minors. In java:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List&lt;Person&gt; people = ....;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List&lt;Person&gt; minors = new ArrayList&lt;Person&gt;();<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List&lt;Person&gt; adults = new ArrayList&lt;Person&gt;();<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for(Person p: people) {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (p.getAge()&nbsp; &lt; 18) {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; minors.add(p);<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } else {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; adults.add(p);<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>
<p>&nbsp;</p>
<p>What is wrong here is that I need to have side effects inside the for loop. The side effects are mutating the minors and adults lists.&nbsp; The whole thing can be wrapped in a method that will seem as to not mutate state. Something like 'public Pair&lt;List&lt;Person&gt;, List&lt;Person&gt;&gt; partitionByAge(int age)'. But I cannot break it down to smaller chunks without mutating state. Imagine that at some point I'd like to partition people by age &lt; 16 and height &gt; 180. The above method cannot be reused for this. I can wrap this up in a method also, but it is tidious and gains little. So Java discourages me from writing code that does not have side effects. I don't get the goodness of FP: lines of code have effects on other pieces of code, variables change state.</p>
<p>&nbsp;</p>
<p>Scala and other functional languages avoid these:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; val (minors, adults) = people.partition(_.age &lt; 18)</p>
<p>&nbsp;</p>
<p>The fact that I can pass the processing code ('_.age &lt; 18') to another function allows it to work without mutating state. Now I can reuse the partition implementation for other partitioning logic:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; val (tallTeenagers, others) = people.partition(p =&gt; p.age &lt; 16 &amp;&amp; p.height &gt; 180)</p>
<p>&nbsp;</p>
<p>So Scala, being functional has constructs that encourage me to write in a functional manner. Where the major difference is the ability to treat functions as values.</p>
<p>&nbsp;</p>
<p>Something similar can be done in Java:</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pair&lt;List&lt;Person&gt;, List&lt;Person&gt;&gt; minorsAndAdults = people.partition(new Function&lt;Person&gt;() {public boolean apply(Person p) {p.getAge() &lt; 18}})</p>
<p>&nbsp;</p>
<p>So is Java a functional language? No. Why? Because a language is functional if it promotes functional programming. Java does not. The above code is both hard to read and write. Not to mention that this is a very simple use case (what about functions that accept 2 parameters?)</p>
<p>&nbsp;</p>
<p>Would Java become a functional language if closures are added? The idiomatic answer is no. Java will still allow things that do not behave like mathematical functions. It will still have statements (things that do not evaluate to a value, like void methods, 'class Foo {}', 'if' etc.), there will not be statically immutable data structure, there will still not be tail recursion optimization. However, I believe functional programming will be possible in Java, if the programmer will avoid the non-functional aspects of the language. </p>
<p>&nbsp;</p>
<p>If you're interested in seeing functional Java in action see http://functionaljava.org. </p>
<p>&nbsp;</p>
<p>BTW: If you're really into FP, then Scala, Python, Ruby, Lisp (clojure) are more likely candidates. This is because they have the functional constructs that are missing in Java and offer more friendly syntax. If you're looking for pure FP (where side effects are not possible), then Haskell (and Clear) are good candidates and Erlang a close contender (no variables, but some side effects are possible). </p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><br />
&nbsp;</p>
