---
layout: post
title: Simulating SAM closures in Scala
created: 1306224790
author: ittayd
permalink: /incubator/simulating-sam-closures-scala
tags:
- Incubator
- Scala
- sam scala
---
<p><a href="https://docs.google.com/View?docid=k73_1ggr36h">SAM&nbsp;closures </a>are a way to create an implementation for an interface with a single method easily. </p>
<p>&nbsp;</p>
<p>In Java, creation of such interfaces requires the use of annonymous classes.</p>
<p>&nbsp;</p>
<p>In Scala, we have functions.</p>
<p>&nbsp;</p>
<p>But first, why create a single method interface if you can use a function?&nbsp;Well, there are two reasons I&nbsp;can think of:</p>
<ol>
    <li>Typing: if a method accepts an argument of type <em>SAM</em>, then it is is easy to see who extends this type with concrete implementations.</li>
    <li>It allows to add more methods to the interface later on. Sometimes a new feature requires adding a method (maybe overloading)&nbsp;to the interface</li>
</ol>
<p>&nbsp;</p>
<p>Here is how one can simulate SAM&nbsp;closures in Scala:</p>
<p>In SAM.scala</p>
<pre title="code" class="brush: scala;">
trait SAM {
  def meth(s: String): String
}

object SAM {
  implicit def fn2SAM(fn: String =&gt; String) = new SAM {
    def meth(s: String) = fn(s)
  }
}


</pre>
<p>Then somewher else:</p>
<pre title="code" class="brush: scala;">
class Service {
  def example(sam: SAM) = sam(&quot;hi&quot;)
}

</pre>
<p>Now we want to call <em>Service#example</em> with a function:</p>
<pre title="code" class="brush: scala;">
service.example{s: String =&gt; s * 2}</pre>
<p>&nbsp;</p>
<p>What is happening here is this:</p>
<ul>
    <li>The compiler sees that <em>example </em>is called with an argument <em>String =&gt;&nbsp;String</em></li>
    <li>But it expecs a SAM&nbsp;instance</li>
    <li>So the compiler searches for an implicit conversion in scope and in companion objects of related types (in this case Function1 and SAM)</li>
    <li>It finds the conversion in the object SAM&nbsp;and applies it.</li>
</ul>
<p>&nbsp;</p>
<p>The main benefit here is that in order to call <em>service.example{s: String =&gt; s * 2}</em> ther is no need to import SAM. Just Service, the compiler figures out the rest. So usage is nice</p>
<p>&nbsp;</p>
<p>So this is all well for our own defined types. But what if I&nbsp;want to use predefined types?&nbsp;E.g., I&nbsp;want to use Java's Callable?</p>
<p>&nbsp;</p>
<p>We can create a SAM&nbsp;type wrapper. Here I&nbsp;use the type 'SAM' again:</p>
<pre title="code" class="brush: scala;">
trait SAM[T] {
  def inst: T
}

object SAM {
  implicit def fn2SamCallable[T](fn: () =&gt; T) = new SAM[Callable[T]] {
    def inst = new Callable[T] {
      def call = fn()
    }
  }
} 

def example(sam: SAM[Callable[String]]) = sam.inst.call

example{() =&gt; &quot;hi&quot;}</pre>
<p>&nbsp;</p>
<p>So by wrapping arguments with SAM type decorator we allow the use of functions in place of 3rd party interfaces. (In general the <em>example</em> can implement passing sam.inst to an java.util.concurrent Executor)</p>
<p>&nbsp;</p>
<p>What if we don't want the wrapping?&nbsp;Or if we want to use a 3rd party method that accepts the interface?</p>
<p>&nbsp;</p>
<p>Unfortunately, that's as far as type inference will go. If we want our <em>example </em>method to accept arguments of the interface directly (<em>def example[T](callable:&nbsp;Callable[T]) = ...</em>) then the compiler will not search for companion objects of the involved types (e.g., convert a function to Callable[OurType]). In this case, we're left with requiring the client code to import an implicit conversion into scope, or extend a class that provides it:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: scala;">
class Implicits {
  implicit def fn2Callable[T](fn: () =&gt; T) = new Callable[T] {
    def call = fn()
  }
}

object Implicits extends Implicits

def example[T](callable: Callable[T]) = callable.call

import Implicits._
example{() =&gt; &quot;hi&quot;}

// or
class My extends Implicits {
  def go = example{() =&gt; &quot;hi&quot;}
}

</pre>
<p>&nbsp;</p>
