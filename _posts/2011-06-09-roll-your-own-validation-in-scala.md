---
layout: post
title: roll your own validation in scala
created: 1307629805
author: ittayd
permalink: /incubator/roll-your-own-validation-scala
tags:
- Incubator
- Scala
---
<p>A collegue approached me with a problem:&nbsp;He has a REST API and he wishes to validate the posted parameters and construct a class from them or throw an exception.</p>
<p>&nbsp;</p>
<p>Validations are both trying to parse the parameter, e.g., convert to Int, as well as custom validations, e.g., make sure the number is positive, a string is of a certain format etc.</p>
<p>&nbsp;</p>
<p>The trivial approach is to use a lot of 'if' statements or try-catch statements:</p>
<pre title="code" class="brush: scala;">
val i = param.toInt

if (i &lt; 0) throw new IllegalArgumentException(&quot;param must be non negative&quot;)</pre>
<p>&nbsp;</p>
<p>Or, if we need a custom exception or want to do something else with errors:</p>
<pre title="code" class="brush: scala;">
var error: Throwable = _
try {
  val i = param.toInt

  if (i &lt; 0) error = new IllegalArgumentException(&quot;param must be non negative&quot;)
} catch {
  case e =&gt; error = e
}

// do something with error

</pre>
<p>This of course gets worse as we handle more parameters and more types of validations.</p>
<p>&nbsp;</p>
<p>What more, the requirement is to catch all validation errors for all parameters and report them as one to the user.</p>
<p>&nbsp;</p>
<p>If we were in Java land, we would probably need at this point to find a library that does this sort of thing for us, with a lot of boilerplate and maybe some reflection.</p>
<p>&nbsp;</p>
<p>We might try scalaz, but for me it is too complex to get into (btw, would love a comment to show how to do this in scalaz)</p>
<p>&nbsp;</p>
<p>Fortunately, it is easy to roll our own.</p>
<p>&nbsp;</p>
<p>The approach: a Validation object can be either a Success or a Failure. A Success holds a value that passed validation, a Failure holds a list of errors gathered. Success is fragile, once a validation fails, it becomes a Failure. The Failure does not care of future validations.</p>
<p>&nbsp;</p>
<p>To validate the value inside a Validation object, we call the flatMap method and pass it a function</p>
<p>&nbsp;</p>
<p>If you're familiar with Scala, this is very similar to Option:&nbsp;Success is like Some, Failure is like None. The difference is that Failure carries information (the errors)</p>
<p>&nbsp;</p>
<p>Validation is generic:&nbsp;A is the value type, E is the error type (so we can have erros in the form of exceptions, or strings or whatever is suitable)</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
trait Validation[A, E] {
  def map[B](f: A =&gt; B): Validation[B, E]
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2]
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B): B
  def &gt;&gt;=[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = flatMap(f)
}

case class Success[A, E](a: A) extends Validation[A, E] {
  def map[B](f: A =&gt; B) = Success(f(a))
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = f(a)
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B) = a
}

case class Failure[A, E](errors: Seq[E]) extends Validation[A, E] {
  def map[B](f: A =&gt; B) = this.asInstanceOf[Failure[B, E]]
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = this.asInstanceOf[Failure[B, E2]]
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B) = f(errors)
}
</pre>
<p>&nbsp;</p>
<p>We can add some utility methods to create&nbsp; a Validation as well as validate if something can be done without exception or passes a predicate:</p>
<pre title="code" class="brush: scala;">
object Validation {
  def apply[A](a: A) = Success(a) 
  def succeeds[A, B](f: A =&gt; B): A =&gt; Validation[B, Throwable] = (a: A) =&gt; try {Success(f(a))} catch {case e =&gt; Failure(Seq(e))}
  def tests[A, E](f: A =&gt; Boolean,e: =&gt; E): A =&gt; Validation[A, E] = (a: A) =&gt; if (f(a)) Success(a) else Failure(Seq(e))
}
</pre>
<p>&nbsp;</p>
<p>We can now validate as follows:</p>
<pre title="code" class="brush: scala;">
scala&gt; val v = Validation(&quot;-1&quot;) &gt;&gt;= succeeds(_.toInt) &gt;&gt;= tests(_ &gt;=0 , new IllegalArgumentException(&quot;param must be non negative&quot;))
v: Validation[Int,java.lang.IllegalArgumentException] = Failure(List(java.lang.IllegalArgumentException: param must be non negative))

scala&gt; val w = Validation(&quot;hi&quot;) &gt;&gt;= tests(!_.isEmpty, new IllegalArgumentException(&quot;must not be empty&quot;))
w: Validation[java.lang.String,java.lang.IllegalArgumentException] = Success(hi)</pre>
<p>&nbsp;</p>
<p>So far, pretty simple. But how do we use these validations?&nbsp;We can try and match all to see if successfull, but then our code become ugly again.</p>
<p>&nbsp;</p>
<p>What I'd like to have is create a composite validation object so that I can use `map` and `getOrElse` on it. Furthermore, I'd like things to be type safe. So the composite validation should carry a value that is a tuple of the values of parameters.</p>
<p>&nbsp;</p>
<p>It is probably clearer to show usage code:</p>
<pre title="code" class="brush: scala;">
case class Person(name: String, age: Int)

(v ++ w) map {case (i, s) =&gt; Person(s, i)} getOrElse {s =&gt; throw s.head}

</pre>
<p>I&nbsp;create the compsite validation using the `++` operator. Since <em>v</em> is type <em>Validation[Int, Throwable] </em>and <em>w</em> is type <em>Validation[String, Throwable]</em>, the composite validation is of type Validation[(Int, String), Throwable]. I&nbsp;can therefore map with a function that extracts the individual components and creates a Person object and in case of errors, throw the first one (or, create a list of errors and display / throw them)</p>
<p>&nbsp;</p>
<p>The tricky part is implementing `++`. `<em>v ++ w</em>` should create a <em> Validation[(Int, String), Throwable]</em>  while `v ++&nbsp;w ++&nbsp;u` should create a <em>Validation[(Int, String, U), Throwable]&nbsp;</em>where U is the type of value of <em>u</em>.</p>
<p>&nbsp;</p>
<p>In other words, what is the return value of:</p>
<pre title="code" class="brush: scala;">
def ++[B, F &gt;: E](vb: Validation[B, F])
</pre>
<p>?</p>
<p>&nbsp;</p>
<p>If <em>A&nbsp;</em>(the value type of the left validation)&nbsp;is any type, it should be <em>Validation[(A, B), F]</em><em>. </em>But if A is a tuple, say <em>(X, Y)</em> then the result should be <em>Validation[(X, Y, B), F]</em></p>
<p>&nbsp;</p>
<p>To do that, we use type classes. First the code, then the explanation:</p>
<pre title="code" class="brush: scala;">
trait TupleAdd[A, B] {
  type Added
  def add(a: A, b: B): Added
}

trait LowLevelTupleAdd {
  implicit def any[A, B] = new TupleAdd[A, B] {
    type Added = (A, B)
    def add(a: A, b: B) = (a, b)
  }
}

object TupleAdd extends LowLevelTupleAdd {

  implicit def tuple2TA[A, B, C] = new TupleAdd[(A, B), C] {
    type Added = (A, B, C)
    def add(ab: (A, B), c: C) = (ab._1, ab._2, c)
  }
}</pre>
<p>&nbsp;</p>
<p>So TupleAdd of A and B defines a type for the result of adding the two into a tuple as well as a method that does this. I've provided two implementations:&nbsp;the first accepts any <em>A&nbsp;</em>and <em>B </em> and creates a tupel <em>(A, B)</em>. The second accepts a first element of type <em>(A, B)&nbsp;</em>and a second elemnet of type <em>C</em> and creates a tupe <em>(A, B, C)</em> (The use of LowLevelTupleAdd is to prioritize <em>tuple2TA</em> before <em>any</em><em>&nbsp;</em>since the latter applys to all types). Since Validation is typesafe, and the compiler always tries to find the most restrictive implicit, this will do what we need.</p>
<p>&nbsp;</p>
<p>Here is `++` in Validation (<strong>Note:&nbsp;We need the experimental feature of dependent method types for this to work. Use -Xexperimental to turn it on in the REPL&nbsp;or compiler</strong>)</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
 def ++[B, F &gt;: E](vb: Validation[B, F])(implicit tu: TupleAdd[A, B]): Validation[tu.Added, F] = (this, vb) match {
    case (Success(a), Success(b)) =&gt; Success(tu.add(a,b))
    case (Failure(e1), Failure(e2)) =&gt; Failure(e1 ++ e2)
    case (_, f@Failure(e2)) =&gt; f.asInstanceOf[Validation[tu.Added, F]]
    case (f@Failure(e1), _) =&gt; f.asInstanceOf[Validation[tu.Added, F]]
  }</pre>
<p>&nbsp;</p>
<p>Here is the complete source code:</p>
<pre class="brush: scala;" title="code">
trait TupleAdd[A, B] {
  type Added
  def add(a: A, b: B): Added
}

trait LowLevelTupleAdd {
  implicit def any[A, B] = new TupleAdd[A, B] {
    type Added = (A, B)
    def add(a: A, b: B) = (a, b)
  }
}

object TupleAdd extends LowLevelTupleAdd {

  implicit def tuple2TA[A, B, C] = new TupleAdd[(A, B), C] {
    type Added = (A, B, C)
    def add(ab: (A, B), c: C) = (ab._1, ab._2, c)
  }

  
}

import collection.generic.CanBuildFrom
import collection.SeqLike

trait Validation[A, E] {
  def map[B](f: A =&gt; B): Validation[B, E]
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2]
  def &gt;&gt;=[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = flatMap(f)
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B): B
  def ++[B, F &gt;: E](vb: Validation[B, F])(implicit tu: TupleAdd[A, B]): Validation[tu.Added, F] = (this, vb) match {
    case (Success(a), Success(b)) =&gt; Success(tu.add(a,b))
    case (Failure(e1), Failure(e2)) =&gt; Failure(e1 ++ e2)
    case (_, f@Failure(e2)) =&gt; f.asInstanceOf[Validation[tu.Added, F]]
    case (f@Failure(e1), _) =&gt; f.asInstanceOf[Validation[tu.Added, F]]
  }
}

case class Success[A, E](a: A) extends Validation[A, E] {
  def map[B](f: A =&gt; B) = Success(f(a))
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = f(a)
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B) = a
}

case class Failure[A, E](errors: Seq[E]) extends Validation[A, E] {
  def map[B](f: A =&gt; B) = this.asInstanceOf[Failure[B, E]]
  def flatMap[B, E2](f: A =&gt; Validation[B, E2]): Validation[B, E2] = this.asInstanceOf[Failure[B, E2]]
  def getOrElse[B &gt;: A](f: Seq[E] =&gt; B) = f(errors)
}


object Validation {
  def apply[A](a: A) = Success(a) 
  def succeeds[A, B](f: A =&gt; B): A =&gt; Validation[B, Throwable] = (a: A) =&gt; try {Success(f(a))} catch {case e =&gt; Failure(Seq(e))}
  def tests[A, E](f: A =&gt; Boolean,e: =&gt; E): A =&gt; Validation[A, E] = (a: A) =&gt; if (f(a)) Success(a) else Failure(Seq(e))
}

import Validation._

val v = Validation(&quot;38&quot;) &gt;&gt;= succeeds(_.toInt) &gt;&gt;= tests(_ &gt;=0 , new IllegalArgumentException(&quot;param must be non negative&quot;))

val w = Validation(&quot;ittay&quot;) &gt;&gt;= tests(!_.isEmpty, new IllegalArgumentException(&quot;must not be empty&quot;))


case class Person(name: String, age: Int) 
val x = (v ++ w) map {case (i, s) =&gt; Person(s, i)} getOrElse {s =&gt; throw s.head}
</pre>
<p>&nbsp;</p>
