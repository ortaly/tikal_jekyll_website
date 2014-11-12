---
layout: post
title: Type Driven Design
created: 1322558951
author: ittayd
permalink: /incubator/type-driven-design
tags:
- Incubator
- scala typing
- design
---
<p>When writing code in a statically typed language sometimes types are considered as orthogonal to the logic of the code. We write them to appease the compiler, or get performance or intellisense &amp;&nbsp;navigation, but all of these has no relation to the code itself.</p>
<p>&nbsp;</p>
<p>This is wrong.</p>
<p>&nbsp;</p>
<p>According to the <a href="http://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence">Curry-Howard Correspondance</a>, types can be interpreted as logical statements. For example, consider an application dealing with people. Our most basic entity might be (I&#39;m using Scala here):</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
case class Person(name: String)
</pre>
<p>What this means is there&#39;s a logical implication Person =&gt;&nbsp;String. This literally means &quot;A person has a string&quot;. Which is silly. What we want is to encode &quot;A person has a name&quot;:</p>
<pre class="brush: java;" title="code">
case class Name(s: String)
case class Person(name: Name)</pre>
<p>&nbsp;</p>
<p>(In Scala we can go further:&nbsp;We don&#39;t have to box the string inside a Name class. Instead, we can define an empty trait Named, and a type alias Name for &#39;String with Named&#39;. See Eric Torreborre&#39;s <a href="http://etorreborre.blogspot.com/2011/11/practical-uses-for-unboxed-tagged-types.html">excellent post</a> on this subject)</p>
<p>&nbsp;</p>
<p>Now methods that are supposed to work with names, accept an argument of type Name, instead of String. These methods encode further logic. Our application might have a registry of all people:</p>
<pre class="brush: scala;" title="code">
trait Registry {
  def getPerson(name: Name): Person
}</pre>
<p>&nbsp;</p>
<p>This encoding means that given a Registry and&nbsp; a Name, we have a Person. If this is not true all the time (maybe some people are not registered), then we can encode:</p>
<pre class="brush: scala;" title="code">
trait Registry {
  def getPerson(name: Name): Option[Person]
}</pre>
<p>&nbsp;</p>
<p>Which means that given a Registry and a Name we can either get a Person or None.</p>
<p>&nbsp;</p>
<h3>
	About untyped languages</h3>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>In untyped languages such as Ruby or Python, we can&#39;t encode these logical assertions. When the code base is small, and there are few members of the team, this is manageable, since peopl keep these assertions in their heads. Once the code base starts to grow, it becomes more and more difficult to keep track.</p>
<p>&nbsp;</p>
<p>Some suggest that test-driven-development solves this: if all tests pass, and code coverage is 100%, then the code is sound. I&nbsp;have 2 problems with this:</p>
<ol>
	<li>
		Getting at 100% code coverage is hard. And after you do, it means refactoring is hard since it means rewriting (manually)&nbsp;a lot of tests</li>
	<li>
		Code coverage is not enough. Some logical issues are &quot;between the lines&quot;&nbsp;of the code</li>
</ol>
<p>About the second point, lets consider this untyped pseudo code:</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
def factorial(n) = {
  if (n == 1) 1
  else n * factorial(n - 1)
}</pre>
<p>&nbsp;</p>
<p>It is trivial to write a test that obtains 100% code coverage for this method. But this method is not correct. It does not work for negative numbers.</p>
<p>&nbsp;</p>
<p>Here is the typed version:</p>
<pre class="brush: scala;" title="code">
def factorial(n: Int) = {
  if (n == 1) 1
  else n * factorial(n - 1)
}</pre>
<p>&nbsp;</p>
<p>Well, this version fails for negative numbers. But there is a clear destinction here:&nbsp;because of the type, we can have automatic test generation, such as <a href="http://code.google.com/p/scalacheck/">ScalaCheck</a> (or see <a href="http://www.tikalk.com/java/automatic-unit-test-generation-java">Java alternatives</a>). These tools will test the code with a range of integers including negatives, 0, etc. They can do that because the argument is typed.</p>
<p>&nbsp;</p>
<p>I&#39;m sure there are such frameworks in untyped languages. Something that allows you to write &#39;integers.test(factorial)&#39;. But if we use this, then it means we&#39;re typing our arguments in the test (saying the &#39;n&#39; is an int), then why not type it in the source code and have all the other benefits of typing?&nbsp;</p>
<p>&nbsp;</p>
<h3>
	Inferring behavior from type</h3>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Another example of where types help is they can allow to infer behavior. In Scala this is done with implicit arguments. Consider this method:</p>
<pre class="brush: scala;" title="code">
def sort[A](l: List[A]): List[A]
</pre>
<p>There is no way to write this method. The reason is that sort needs to compare the elements&nbsp;(without resolving to reflection hacking). Another approach is this:</p>
<pre class="brush: scala;" title="code">
def sort[A &lt;: Comparable](l: List[A]): List[A]
</pre>
<p>Now we&#39;ve endoded that for every list of Comparable elements, it can be sorted. This is nice, but it means that elements are subtype of Comparable, which may not always be true&nbsp;(primitives, 3rd party code). It also means there&#39;s one way to compare. A better approach is this:</p>
<pre class="brush: scala;" title="code">
def sort[A](l: List[A], c: Comparator[A]): List[A]
</pre>
<p>Which means that given a list and a way to compare elements, we can get a sorted list. However, such a code is not very nice to use, since every call must now contain another argument which the client needs to provide.</p>
<p>Scala has implicit arguments. This feature uses the type in a method signature to find instances&nbsp; required for arguments:</p>
<pre class="brush: scala;" title="code">
def sort[A : Ordering](list: List[A]): List[A]</pre>
<p>This reads as &#39;for all A with associated or explicit Ordering, a list of A can be sorted&#39;.<br />
	Now we can supply implicit values for various types and the compiler will create the code that uses the right value for each call of sort. This is only possible because we have the type to tell the compiler what to find.</p>
<p>&nbsp;</p>
<p>I&nbsp;hope this post convinced you to use types to encode the logic of your program. TDD&nbsp;FTW!</p>
