---
layout: post
title: An intuition for delimited continuations
created: 1308854881
author: ittayd
permalink: /incubator/intuition-delimited-continuations
tags:
- Incubator
- Scala
---
<p>Many times when trying to explain delimited continuations in Scala, a code example is shown and then explained. Usually this creates confusion since the client code feels unnatural but more importantly, doesn't give an intuition of when to decide to use delimited continuations in our own code.</p>
<p>&nbsp;</p>
<p>The intuition I&nbsp;have is that when I have a function that accepts functions, and the resulting client code means several levels of nesting such functions, then DC can help.</p>
<p>&nbsp;</p>
<p>Let's see a familiar example:</p>
<pre title="code" class="brush: scala;">
scala&gt; List(1,2,3).flatMap{i =&gt;
     |   List(10,20,30).flatMap{j =&gt;
     |     List(100,200,300).map {k =&gt;
     |       k + j + i
     |     }
     |   }
     | }
res0: List[Int] = List(111, 211, 311, 121, 221, 321, 131, 231, 331, 112, 212, 312, 122, 222, 322, 132, 232, 332, 113, 213, 313, 123, 223, 323, 133, 233, 333)</pre>
<p>&nbsp;</p>
<p>This code is hard to read, so Scala has a better construct:</p>
<pre title="code" class="brush: scala;">
scala&gt; for (i &lt;- List(1,2,3);
     |      j &lt;- List(10,20,30);
     |      k &lt;- List(100,200,300))
     |   yield k + j + i
res1: List[Int] = List(111, 211, 311, 121, 221, 321, 131, 231, 331, 112, 212, 312, 122, 222, 322, 132, 232, 332, 113, 213, 313, 123, 223, 323, 133, 233, 333)</pre>
<p>&nbsp;</p>
<p>Note that the nesting is gone.</p>
<p>&nbsp;</p>
<p>But what if we didn't have the `for` construct?</p>
<p>&nbsp;</p>
<p>`flatMap` and `map` are both methods that accepts functions, so they are candidates for DC.</p>
<p>&nbsp;</p>
<p>The intuition is this:&nbsp;If you have a method of the form:</p>
<pre title="code" class="brush: scala;">
def something(f: A =&gt; B): C</pre>
<p>&nbsp;</p>
<p>Which is used like:</p>
<pre title="code" class="brush: scala;">
something {a =&gt; 
  expr1
  expr2
  ...
  exprn
}</pre>
<p>&nbsp;</p>
<p>Then you can create a DC&nbsp;function/method of the form:</p>
<pre title="code" class="brush: java;">
def cpsSomething = shift {f: (A =&gt; B) =&gt; something(f)}</pre>
<p>&nbsp;</p>
<p>Which will be used like:<br />
&nbsp;</p>
<pre title="code" class="brush: scala;">
reset {
  val a = cpsSomething
  expr1
  expr2
  ...
  exprn
}</pre>
<p>&nbsp;</p>
<p>It looks like not much gain, but when several nestings are involved, then code like:</p>
<pre title="code" class="brush: scala;">
something {
  expr1
  something {
     expr2
     something {
       expr3
     }
  }
}</pre>
<p>&nbsp;</p>
<p>Becomes</p>
<pre title="code" class="brush: scala;">
reset {
  val a1 = cpsSomething
  expr1
  val a2 = cpsSomething
  expr2
  val a3 = cpsSomething
  expr3
}


</pre>
<p>Of course in both cases, the methods can accept other arguments except for the `f` function.</p>
<p>&nbsp;</p>
<p>In our case, `flatMap` accepts a function from Int&nbsp; to List[Int]. In DC, the `shift` function is also passed a function whose argument is a function. So the general rule is that the function our &quot;normal&quot;&nbsp;flatMap accepts is the argument of the shift function. This is a bit confusing, so lets see the code&nbsp;(for simplicity, I'm focusing on just the types for the example above, not going into generics or builders):</p>
<pre title="code" class="brush: scala;">
scala&gt; def generator(lst: List[Int]) = shift {f: (Int =&gt; List[Int]) =&gt; lst.flatMap(f)}
generator: (lst: List[Int])Int @scala.util.continuations.cpsParam[List[Int],List[Int]]</pre>
<p>&nbsp;</p>
<p>So now our DC&nbsp;code will work in any code block that accepts an Int and results in List[Int]:</p>
<pre title="code" class="brush: scala;">
scala&gt; reset {
     |   val i = generator(List(1,2,3))
     |   List(i * 2)
     | }
res2: List[Int] = List(2, 4, 6)</pre>
<p>&nbsp;</p>
<p>Which is just equivalent to:</p>
<pre title="code" class="brush: scala;">
scala&gt; List(1,2,3).flatMap{i =&gt; List(i * 2)}
res3: List[Int] = List(2, 4, 6)
</pre>
<p>&nbsp;</p>
<p>In order to sprinkle some syntax sugar, we'll replace the need to wrap the result with a List with a `yld` method:</p>
<pre title="code" class="brush: scala;">
scala&gt; def yld(r: Int) = List(r)
yld: (r: Int)List[Int]</pre>
<p>&nbsp;</p>
<p>And now we have it all:</p>
<pre title="code" class="brush: scala;">
scala&gt; reset {
     |   val i = generator(List(1,2,3))
     |   val j = generator(List(10,20,30))
     |   val k = generator(List(100,200,300))
     |   yld(k + j + i)
     | }
res4: List[Int] = List(111, 211, 311, 121, 221, 321, 131, 231, 331, 112, 212, 312, 122, 222, 322, 132, 232, 332, 113, 213, 313, 123, 223, 323, 133, 233, 333)</pre>
<p>&nbsp;</p>
<p>Or even shorter (and not possible in for comprehension)</p>
<pre title="code" class="brush: scala;">
scala&gt; reset {
     |   yld(generator(List(100,200,300)) + generator(List(10,20,30)) + generator(List(1,2,3)))
     | }
res5: List[Int] = List(111, 112, 113, 121, 122, 123, 131, 132, 133, 211, 212, 213, 221, 222, 223, 231, 232, 233, 311, 312, 313, 321, 322, 323, 331, 332, 333)</pre>
<p>&nbsp;</p>
<p>And we can even further shorten it:</p>
<pre title="code" class="brush: scala;">
scala&gt; def yld(body: =&gt; Int @cpsParam[List[Int], List[Int]]) = reset {List(body)}
yld: (body: =&gt; Int @scala.util.continuations.cpsParam[List[Int],List[Int]])List[Int]

scala&gt;   yld(generator(List(100,200,300)) + generator(List(10,20,30)) + generator(List(1,2,3)))
res5: List[Int] = List(111, 112, 113, 121, 122, 123, 131, 132, 133, 211, 212, 213, 221, 222, 223, 231, 232, 233, 311, 312, 313, 321, 322, 323, 331, 332, 333)</pre>
<p>&nbsp;</p>
<p>(the annotation of cpsParam tells the compiler to treat the code passed to yild as a CPS construct when creating the body thunk)</p>
