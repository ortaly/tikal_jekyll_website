---
layout: post
title: Scala immutable collections
created: 1375800531
author: andrew
permalink: /scala-immutable-collections
tags:
- JAVA
- Java
- Scala
---
<p>I want to start from a citation from the oficial Oracle documentation of Java concurrency:</p>
<blockquote>
	<p>&quot;Immutable objects are particularly useful in concurrent applications. Since they cannot change state, they cannot be corrupted by thread interference or observed in an inconsistent state.</p>
	<p>Programmers are often reluctant to employ immutable objects, because they worry about the cost of creating a new object as opposed to updating an object in place...&quot;</p>
</blockquote>
<p>This explanation is not exact. In fact, programmers often don&#39;t use immutable objects, because it&#39;s hard to use them in Java. For example, if we use <span style="font-family:courier new,courier,monospace;">Collections.unmodifiableCollection</span>, we are stuck with something, which must be copied to a new writable collection, if we want a changed version of it. Also, there are no immutable or unmodifiable versions of the major interfaces (Set, Map, List, etc.) to mark our methods which are not supposed to change the contents of the arguments.</p>
<p>On the other hand, Scala gives us many handy tools for working with immutables with pleasure. It starts from the fact, that variable and constant declaration are equaly easy (in Java we have to add a &quot;final&quot; keyword to make a constant, and many people just omit that out of habit and laziness). But really helps is the fact that Scala has two separate hierarchies of all major collections in packages <span style="font-family:courier new,courier,monospace;">scala.collection.immutable</span> and <span style="font-family:courier new,courier,monospace;">scala.collection.mutable</span>.&nbsp;</p>
<p>And the authors of the standard Scala library even made immutable collections the default, which is always accessible, without any imports. That&#39;s because there are aliases for them in the Predef object. Let&#39;s play with them a little in the Scala REPL, available by entering &quot;scala&quot; in the command line:</p>
<pre>
scala&gt; val v = Vector(1, 2, 3, 4)
v: scala.collection.immutable.Vector[Int] = Vector(1, 2, 3, 4)

scala&gt; val v2 = v.map(_ * 2)
v2: scala.collection.immutable.Vector[Int] = Vector(2, 4, 6, 8)

scala&gt; val v0 = v2.updated(0, 0)
v0: scala.collection.immutable.Vector[Int] = Vector(0, 4, 6, 8)
</pre>
<p>Notice, that we can actually change immutable collections, by creating new copies of it. In Java if you have an immutable collection, you need to select a new container for it (for example, for List you need to select ArrayList or LinkedList), copy the immutable collection into that container, change whatever you need to change, and then you can finally wrap the collection in unmodifiable wrapper with the help of the standard library. With all that hassle, no wonder they are rarely used.</p>
<p>But this brings us to another question: if I create new collections when I work with immutables, what will happen to the performance? Let&#39;s check it. First, let&#39;s define a function, allowing us to measure the execution time of different constructs, and then let&#39;s measure the performance of Java ArrayList:</p>
<pre>
scala&gt; def howLong (f: =&gt; Unit) {
  import compat.Platform._
  val start = currentTime
  f
  println(&quot;Execution time: &quot;+(currentTime - start))
}
howLong: (f: =&gt; Unit)Unit

scala&gt; howLong {
   (0 until 1000000) foreach {i=&gt; javaArray.add(i, i)}
}
Execution time: 1254

scala&gt; var javaArray = new java.util.ArrayList[Int]
javaArray: java.util.ArrayList[Int] = []

scala&gt; howLong {
   (0 until 1000000) foreach {i=&gt; javaArray.add(i, i)}
}
Execution time: 88
</pre>
<p>As you see, it is pretty slow the first time, and much faster on the second attempt. Your experience may vary. Let&#39;s compare that to Scala&#39;s immutable Vector:</p>
<pre>
scala&gt; var v = Vector.fill(1000000)(0)
v: scala.collection.immutable.Vector[Int] = Vector(0, 0, 0, 0, 0, 0, 0, 0, 0, 0,...

howLong {
  (0 until 1000000).foreach {i=&gt; v=v.updated(i, i)}
}
Execution time: 739
</pre>
<p>As you see, we apparently copy the whole 1-million array 1 million times, changing only 1 element in each copy, but it executes much faster, than one could expect. Of course there is a trick - that&#39;s not a simple array. This technique is called &quot;persistent collections&quot;. The simplest example of a persistent collection is a linked list: if you give me a linked list, and I create a new head for it, which points to your old list, we&#39;ll hold apparently different collections, with different length, but the cost of such &quot;duplication&quot; is really cheap. If you add a new head to your list, I will be not affected by your change, so for all practical means, we can think of these lists as different object, despite the fact, that most elements are common.</p>
<p>Such persistent collections are extremely useful for optimization algorithms. When such algorithm tries different options to find the best (or feasible) solution, it can copy different collections with some changes, to reflect the setup at each stage. An easy illustration can be a famous 8-Queens problem applied for a giant table instead of 8x8. When the algorithm tries different places for queens, it can create a 2 dimensional Vector to mark all cells under attack, and recursively try to put more and more new queens on the safe cells. At every level of recursion it will hold a different picture of the board, so if it rolls back from bad selection, it returns to the setup it was before. With Java ArrayList you&#39;d need to create a full copy of the board, instead of logical copies as with Scala&#39;s Vector.</p>
<p>Another strength of the built-in feature of Scala immutable collections is the ability to run parallel operations. Let&#39;s create a mathematical function, with minimum at x=50:</p>
<pre>
scala&gt;def myFunc(x:Int) =Math.log(10 + Math.pow(x-50, 2) - Math.log(Math.pow(x, 0.9)))
myFunc: (x: Int)Double

scala&gt; var min = Double.PositiveInfinity
min: Double = Infinity

scala&gt; var minI = -1
min: Double = Infinity

scala&gt; howLong { (0 until javaArray.size).foreach {i=&gt;
  val currF = myFunc(javaArray.get(i))
  if (currF &lt; min) {
    min = currF
    minI = i
  }
}}
Execution time: 384

scala&gt; minI
res38: Int = 50

scala&gt; howLong(minI = v.minBy(myFunc))
Execution time: 802

scala&gt; minI
res40: Int = 50
</pre>
<p>As we see, at this point Java is faster - well, there is an overhead of the Vector, to allow cheap copy operation as we saw earlier. But now let&#39;s use the parallel ability of the Vector:</p>
<pre class="scala">
scala&gt; howLong(minI = v.par.minBy(myFunc))
Execution time: 426
</pre>
<p>So just by adding &quot;.par&quot; we received a parallelized version of our collection, and it gave some advantage. But my laptop is pretty old, let&#39;s see what will happen on Amazon EC2 c2.xlarge instance with 8 CPUs:</p>
<p>Let&#39;s run exactly the same code on Amazon c1.xlarge instance with 8 CPUs:</p>
<pre>
scala&gt; howLong { (0 until javaArray.size).foreach {i=&gt; val currF = myFunc(javaArray.get(i)); if (currF &lt; min) { min = currF; minI = i } } }
Execution time: 515

scala&gt; howLong(minI = v.minBy(myFunc))
Execution time: 1005

scala&gt; howLong(minI = v.par.minBy(myFunc))
Execution time: 209
</pre>
<p>As you can see, now our naive code utilizes runs x5 times faster thanks to the parallel collections. CPU clocks are not getting faster every year, as it used to be, and with the power of Scala immutable collections we can now utilize our multi-core machines for common operations. In the next article we&#39;ll talk about adapting classical sequential algorithms to immutable collections and parallel execution</p>
