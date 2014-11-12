---
layout: post
title: 'Functional Programming (in #scala) for the rest of us '
created: 1314717311
author: ittayd
permalink: /incubator/functional-programming-scala-rest-us
tags:
- Incubator
- fp scala
---
<p>Whoever tries to learn Scala immediately encounters talk about <a href="http://en.wikipedia.org/wiki/Functional_programming">Functional Programming</a>.</p>
<p>&nbsp;</p>
<p>The first step is having functions as first-class citizens. This opens up new ways of programming, and the Scala collection library if far superior to Java&#39;s because of it. There are many examples of how boilerplate loops of creating and populating new collections can be replaced by a succint one liner of using `map`.</p>
<p>&nbsp;</p>
<p>In this post I&#39;ll try to explain the more advanced concepts of Functors,&nbsp;Applicatives and Monads. I&#39;m doing it starting from everyday OO&nbsp;and building the API&nbsp;and the implementation as we go along.</p>
<p>&nbsp;</p>
<p>(Note:&nbsp;This paper was not easy to write and may still be confusing despite my best efforts. I would love to hear your thoughts and suggestions in the comments, or through twitter:&nbsp;@ittayd)</p>
<p>&nbsp;</p>
<p>So what are these?&nbsp;In general, they are abstractions or design patterns that allow to work with values that are wrapped in some context.</p>
<p>&nbsp;</p>
<p>What is a context?&nbsp;It is just a trait/class that gives access to a value, but adds more meaning.&nbsp;In this post I&#39;ll work with the Future context, and I&#39;ll show some examples of more towards the end.</p>
<p>&nbsp;</p>
<p>So what is the Future context?&nbsp;It is a generic class that is a reference to a value that will be calculated in the future.</p>
<p>&nbsp;</p>
<p>We might try an initial design like this:</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  def get: A
}</pre>
<p>&nbsp;</p>
<p>The <em>get </em>method blocks until the value is ready. We might use it like so:</p>
<pre class="brush: scala;" title="code">
def findUser(name: String): Future[User] = ...

....

val future = findUser(userName)
val user = future.get
println(user)</pre>
<p>&nbsp;</p>
<p>So findUser does not immediately return a User value, but a Future instance.</p>
<p>&nbsp;</p>
<p>Obviously, the above code is not very good. We try to be lazy in findUser by returning a Future, but using get blocks the thread.</p>
<p>&nbsp;</p>
<p>We may try to overload get to accept a timeout, or provide a tryGet that throws an exception if the value is not calculated yet. But these lead to both complex implementation of Future as well as complex client code of retrying, which is also sub optimal since it works in a busy loop.</p>
<p>&nbsp;</p>
<p>Our second attempt can be to provide a callback that is called once the value is ready:</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  def onReady(f: A =&gt; Unit)
}</pre>
<p>&nbsp;</p>
<p>And use it like so:</p>
<pre class="brush: java;" title="code">
val future = findUser(userName)
future.onReady{user =&gt; prinln(user)}
// or future.onReady(println)</pre>
<p>&nbsp;</p>
<p>But on further inspection, this has several drawbacks:</p>
<ul>
	<li>
		What if we want to register more than one callback&nbsp;(imagine the future instance being passed around several methods)</li>
	<li>
		What if we don&#39;t just want to print the value and forget about it, but calculate something based on it, e.g., get the User&#39;s age?</li>
	<li>
		&nbsp;</li>
</ul>
<p>About the second point, without knowing any better, we use &#39;user.get.age&#39;, thus blocking the thread. But if consider this a bit we realize that all we need is that given a Future[User] to return a Future[Int]. This keeps the value in the context and thus avoids using &#39;get&#39;</p>
<h2>
	&nbsp;</h2>
<h2>
	Functor</h2>
<p>If we know FP&nbsp;concepts, we immediately realize that mapping Future[User] to Future[Int] means that Future needs to be a Functor.</p>
<p>&nbsp;</p>
<p>First, here&#39;s the new design, then the explanation:</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  def map[B](f: A =&gt; B): Future[B]
}</pre>
<p>&nbsp;</p>
<p>The method map accepts a function that takes a value of type A and returns a value of type B. map returns a new instance of Future that can provide this value.</p>
<p>A few things to note:</p>
<ul>
	<li>
		f is a pure function:&nbsp;that is, it knows nothing about Future. This means it is reusable in other contexts.</li>
	<li>
		map doesn&#39;t need to apply f immediately (in fact it must not), instead it can return an instance of Future that will apply f only in the last possible moment.</li>
</ul>
<p>&nbsp;</p>
<p>Here&#39;s a trivial implementation</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  // blocks until a value is ready
  def get: A 

  // checks if a value is ready
  def isDone: Boolean

  def map[B](f: A =&gt; B) = new Future[B] {
    def get = f(Future.this.get)
   
    def isDone = Future.this.isDone
  }
}
    
object Future {
  class Concrete[A] extends Future[A] {
    def put(a: A) = // used by whoever created the Future (e.g., findUser)&nbsp;to put a value once calculated
    def get = // concrete implementation
    def isDone = // concrete implementation
  }
  def create[A] = new Concrete[A]
} </pre>
<p>&nbsp;</p>
<p>And used like:</p>
<pre class="brush: scala;" title="code">
def findUser(name: String):&nbsp;Future[User] = {
  val future = Future.create[User]
  // pass future as callback to some method that will use `put` method when the value is ready
  future
}

val user = findUser(userName)
val age: Future[String] = user.map{user =&gt; user.age]
// or user.map{_.age}

</pre>
<p>Now that we have a Future holding the user&#39;s age, we can wait until the last minute before calling get. E.g., start rendering a result web page, or if we read several users, maybe parallelism kicks into play, etc.</p>
<p>&nbsp;</p>
<p>Something important to note here:&nbsp;I&#39;m not concerning myself with avoiding mutation (Future#put)&nbsp;which is something unholy in &quot;pure FP&quot;. I&#39;m just taking the concepts that help in my normal, mutateble, OO&nbsp;programming</p>
<p>&nbsp;</p>
<p>To summarise:&nbsp;Knowing about the &quot;design pattern&quot;&nbsp;of creating a map method, I&nbsp;could create better Future class.&nbsp;</p>
<p>&nbsp;</p>
<p>UPDATE:&nbsp;Here&#39;s a description of Functor as a design pattern:</p>
<p>Problem: You have a generic context trait/class C[A]. You wish to allow working with the values without ruining the abstraction (without using #get or #isDone)</p>
<p>Solution:&nbsp;provide a method map[B](f:&nbsp;A =&gt;&nbsp;B):&nbsp;C[B] that creates an instance C[B] that (lazily)&nbsp;implements the interface of C by applying f on the value.</p>
<p>&nbsp;</p>
<h2>
	More Contexts</h2>
<p>Here are examples of more contexts with explanation of what they mean (the explanation focused on newbies):</p>
<p>&nbsp;</p>
<ul>
	<li>
		<em>Option </em>- This context holds a value that may not exist. This is similar to the way methods return null in Java when there&#39;s nothing to return, but clearly documents, using the type, this fact. That is, a method findUser in Java might return null when no such user exists, but then its return type is User, and one needs to read the documentation to find if a return value of null is possible. Instead, the method can return Option[User] which means it can either return a subclass Some containing the user object, or a singleton instance None</li>
</ul>
<p>&nbsp;</p>
<ul>
	<li>
		<em>Either</em>&nbsp; - This context is similar to Option, but instead of instances being either Some(value) or None, they can be either Right(value)&nbsp;or Left(error), where the error type can be anything. In particular, it can be an Exception. Then a method may return either Right(user)&nbsp;if the user is found or Left(new UserNotFoundException) otherwise</li>
	<li>
		<em>List</em> - This context holds several values and can be thought of the result of a non-deterministic method. That is, a method that has several results.</li>
</ul>
<p>&nbsp;</p>
<p>(if you&#39;re interested in seeing implementation of map for these, look in the scala source code for Option#map and List#map, Either is trickier, you need to use either.right.map, or look in the scalaz library)</p>
<p>&nbsp;</p>
<h2>
	&nbsp;</h2>
<h2>
	Generic Programming</h2>
<p>Another aspect of using the Functor design pattern (or abstraction)&nbsp;is that this makes client code uniform</p>
<p>&nbsp;</p>
<p>What is the gain here, well, look at this client code:</p>
<pre class="brush: scala;" title="code">
val user = findUser(userName)
val age = user.map{user =&gt; user.age]
</pre>
<p>&nbsp;</p>
<p>Imagine that we change findUser to return Option[User] instead of Future[User] (fortunately, Option has a map method). The client code doesn&#39;t change (just needs to be recompiled).</p>
<p>&nbsp;</p>
<p>Also, a reader of this code that knows a bit about FP&nbsp;immediately understands that user is in some kind of context and that map will return a new context around the user&#39;s age.</p>
<p>&nbsp;</p>
<h2>
	Applicative</h2>
<p>What happpens if we want to work with several &quot;contextual values&quot;. E.g.,:</p>
<pre class="brush: scala;" title="code">
def marry(man: User, woman: User): Family = ....

val joe = findUser(&quot;joe&quot;)
val jane = findUser(&quot;jane&quot;)
</pre>
<pre class="brush: scala;" title="code">
&nbsp;</pre>
<p>We want to call a marry on joe and jane. But how can we? We can try to use map:</p>
<pre class="brush: scala;" title="code">
joe.map{joe =&gt; jane.map{jane =&gt; marry(joe, jane)}}
</pre>
<pre class="brush: scala;" title="code">
&nbsp;</pre>
<p>But since each call to map wraps the result type of the function in a Future, we end up with Future[Future[Family]]</p>
<p>&nbsp;</p>
<p>So we need another method to work with functions of higher arity. An initial approach is:</p>
<pre class="brush: sql;" title="code">
def app[B, C](other: Future[B], f: (A, B) =&gt; C):&nbsp;Future[C]</pre>
<p>&nbsp;</p>
<p>This works, but what happens if we want to use a function with 3 arguments?&nbsp;4 arguments?&nbsp;</p>
<p>&nbsp;</p>
<p>Knowing the applicative patterns helps here. The key point is that a if we take a function f that accepts n arguments, it can be though of instead as a chain of n functions each accepting one argument and returning another function, or the final result. In other words, instead of type `f:&nbsp;(A<sub>1</sub>,A<sub>2</sub>,...,A<sub>n</sub>) =&gt;&nbsp;R` f can be can instead be viewed `f: A<sub>1</sub>=&gt;A<sub>2</sub>=&gt;,...,=&gt;A<sub>n</sub>=&gt;R`. In fact, Scala has native support for this:</p>
<pre class="brush: scala;" title="code">
scala&gt; def marry(man: User, woman: User): Family = null
marry: (man: User, woman: User)Family

scala&gt; // or, val marry: (User, User) =&gt; Family ...

scala&gt; marry _
res0: (User, User) =&gt; Family = &lt;function2&gt;

scala&gt; (marry _).curried
res1: (User) =&gt; (User) =&gt; Family = &lt;function1&gt;

</pre>
<p>Working with 1 argument functions is easier, lets try:</p>
<pre class="brush: scala;" title="code">
scala&gt; joe.map((marry _).curried)
res3: Future[(User) =&gt; Family] = // elided</pre>
<p>&nbsp;</p>
<p>What does a Future of a function mean?&nbsp;It means that once the joe future value is set, then marry can be partially applied and we get a function that we can apply on jane.</p>
<p>&nbsp;</p>
<p>So now we need a way to apply a function inside a Future to more arguments (jane in this case). So we add a method:</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  def map...

  def apply[B](f:&nbsp;Future[A =&gt;&nbsp;B]): Future[B]
}</pre>
<p>&nbsp;</p>
<p>And now we can use this as:</p>
<pre class="brush: scala;" title="code">
val partial = joe.map((marry _).curried)
val family = jane.apply(partial)

// or:
val family = jane.apply(joe.map((marry _).curried))</pre>
<p>&nbsp;</p>
<p>This solves our problem, but is really ugly.&nbsp; The scheme of passing a function into a method doesn&#39;t work very well. Instead, what if we could do this:</p>
<pre class="brush: scala;" title="code">
val futureMarry: Future[User =&gt; User =&gt; Family] = Future.create(marry)
val partial: Future[User =&gt; Family] = futureMarry.apply(joe)
val family: Future[Family] = partial.apply(jane)

// or:
Future.create(marry).apply(joe).apply(jane)</pre>
<p>&nbsp;</p>
<p>So we start with a curried function and then reduce it by applying it to a single argument each time, until we have the result.</p>
<p>&nbsp;</p>
<p>(UPDATE: I&#39;ve updated the following implementation of apply according to lockster in <a href="http://lockster.posterous.com/applying-applicative-functors-in-scala">his blog post</a>. Previously it was a utility trait and implicit conversion)</p>
<p>&nbsp;</p>
<p>Looks promising, but for this to work, we need a way for apply to be defined only for Future instances holding a function. Furtunately, Scala has a nice feature called <a href="http://stackoverflow.com/questions/3427345/what-do-and-mean-in-scala-2-8-and-where-are-they-documented/3427759#3427759">generalized type constraints</a> which allows to constrain a method so it can only be used on instances that correspond to some condition. In our case, the condition is that A will be a function.</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
def apply[B, C](b: Future[B])(implicit ev: A &lt;:&lt; (B =&gt; C)) = new Future[C] {
  def get = Future.this.get(b.get)
  def isDone = Future.this.isDone &amp;&amp; b.isDone
}</pre>
<p>&nbsp;</p>
<p>The implicit argument <em>ev</em> is an evidence that A is a function (B =&gt;&nbsp;C). That is, if calling apply on a future where A is something else, then the compiler will not be able to find a value for ev and the compilation will fail. ev is also an implicit function, so acts as an implicit conversion. So inside apply, Future.this.get(b.get)&nbsp;gets the wrapped value Future.this.get, converts it to a function and applies it to b.get (blocking if the future value is not resolved yet)</p>
<p>&nbsp;</p>
<p>Note that that a funtion of the form B =&gt;&nbsp;D =&gt;&nbsp;E will also be valid since it can be viewed as B =&gt;&nbsp;(D =&gt; E). That is, the&nbsp;C&nbsp;generic parameter is (D =&gt;&nbsp;E).</p>
<p>&nbsp;</p>
<p>To lift a function into a future, we create a utility method:</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
object Future {
</pre>
<pre class="brush: scala;" title="code">
  ...

  class Value[A](a: A) extends Future[A] {
    def get = a
    def isDone = true
  }
  def create[A](a: A) = new Value(a)
}
&nbsp;
</pre>
<p>Future.create creates a dummy Future that already has the value resolved.</p>
<p>&nbsp;</p>
<p>And the usage is:</p>
<pre class="brush: scala;" title="code">
Future.create((marry _).curried).apply(joe).apply(jane)</pre>
<p>&nbsp;</p>
<p>So now we have a way to apply any sort of function of simple values on future values. We do it by putting it in context and then knowing how to tread functions in context.</p>
<p>&nbsp;</p>
<p>This code is still not nice. It requied the expression `(marry _).curried`. We can overload Future.create to have instances for functions of different arities, and call curried on them. E.g.:</p>
<pre class="brush: scala;" title="code">
object Future {
  ....

  def create[A, B, C](f: (A, B) =&gt; C) = new Value(f.curried)
  def create[A, B, C, D](f: (A, B, C) =&gt; D) = new Value(f.curried)
}

</pre>
<p>Or we can create a trait ApplicativeSupport like:</p>
<pre class="brush: java;" title="code">
trait ApplicativeSupport[AP[_]] {
  def create[A](a: A): AP[A]
  
  def create[A, B, C](f: (A, B) =&gt; C) = create(f.curried)

  def create[A, B, C, D](f: (A, B, C) =&gt; D) = create(f.curried)
}

object Future extends ApplicativeSupport[Future] {
  def create[A](a: A) = new Value(a)
}</pre>
<p>&nbsp;</p>
<p>This uses Scala&#39;s support for type constructors to provide generic result values of create.</p>
<p>&nbsp;</p>
<h2>
	Monads</h2>
<p>So far, we&#39;ve dealt with functions that work on &quot;pure&quot;&nbsp;values, like marry, or User#age. But what happens when we need to deal with functions that return a value in a context. We already used one:&nbsp;findUser, now imagine we have another one:</p>
<pre class="brush: scala;" title="code">
def findProfile(user: User): Future[User]
// or:&nbsp;val findProfile:&nbsp;User =&gt;&nbsp;Future[User]
</pre>
<p>&nbsp;</p>
<p>Imagine both functions were simple ones:</p>
<pre class="brush: scala;" title="code">
def simpleFindUser(name: String): User
def simpleFindProfile(user: User): Profile</pre>
<p>&nbsp;</p>
<p>Then there&#39;s no problem using them:</p>
<pre class="brush: scala;" title="code">
simpleFindProfile(simpleFindUser(userName))</pre>
<p>&nbsp;</p>
<p>But we can&#39;t use the result of findUser to findProfile, since the types don&#39;t match.</p>
<p>&nbsp;</p>
<p>But, similarly to `map`, that accepted f:&nbsp;A=&gt;B, we can define flatMap:</p>
<pre class="brush: java;" title="code">
trait Future[A] {
  ....
  def flatMap[B](f: A =&gt; Future[B]): Future[B]
}</pre>
<p>&nbsp;</p>
<p>And use like so:</p>
<pre class="brush: scala;" title="code">
findUser(userName).flatMap(findProfile)</pre>
<p>&nbsp;</p>
<p>The implementation of flatMap is similar to that of map:</p>
<pre class="brush: scala;" title="code">
trait Future[A] {
  ...
  // note:&nbsp;simplified for beravity. there&#39;s a bug here (see below)
  def flatMap[B](f: A =&gt; Future[B]) = new Future[B] { 
    def get = f(Future.this.get).get
   
    def isDone = Future.this.isDone &amp;&amp; f(Future.this.get).isDone
  }
}</pre>
<p>&nbsp;</p>
<p>The above implementation is short, but has a bug since f may be called multiple times. If it accesses the database, it will access it multiple times. There are two solutions here:</p>
<ol>
	<li>
		add a variable to hold the result of f once used</li>
	<li>
		use only pure functions. pure functions do not create side effects (such as accessing a database) and so can be called once or multiple times with the same arguments, since they will always return the same results. Even if their calculation is heavy, their first invocation can be cached without worry that the cache will be stale later&nbsp;(e.g., due to changes in the database).</li>
</ol>
<p>Approach 1 is left as an excersize to the reader. Approach 2 requires the use of the IO&nbsp;monad, and I&nbsp;hope I gave enough incentive to go find more about it.</p>
<p>&nbsp;</p>
<p>And back to applicatives:&nbsp;recall that our problem with Functors was that map can&#39;t support the use of functions whose arity is larger than 1. But every monad is also an applicative (that is, we can define apply in terms of flatMap. An excercise left for the reader). So we can now do:</p>
<pre class="brush: scala;" title="code">
joe.flatMap{joe =&gt; jane.map{jane =&gt; marry(joe, jane)}}</pre>
<p>&nbsp;</p>
<p>This is a bit messy, which is why Scala has for comprehensions:</p>
<pre class="brush: scala;" title="code">
for (man &lt;- joe; woman &lt;- jane) yield marry(man, woman)

</pre>
<p>This translates to exactly the previous expression.</p>
<p>&nbsp;</p>
<p>So scala&#39;s for comprehensions are really not about loops, but about monadic function application! And by implementing map and flatMap we gain Scala&#39;s support to make client code even more consistent, readable and reusable.</p>
<p>&nbsp;</p>
<h2>
	Summary</h2>
<p>The use of Functors, Applicative and Monad (as well as other classes of types)&nbsp;is just like following the GoF design patterns. It helps us creates better code for dealing with values in a context and in a universal way. Code that uses map/apply/flatMap need not change when the context changes, the context type do not prolifirate unneedly and its meaning is obvious to those familiar with the concepts.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>
	A Word About Implementation</h2>
<p>(well, maybe more than a word..)</p>
<p>&nbsp;</p>
<p>Throughout this article, the design was OO&nbsp;based. I&#39;ve added methods to Future and when required created an implicit conversion to another class. This is nice for explaining things from an OO&nbsp;perspective, but not very scalable. Once you start learning FP&nbsp;concepts you realise that Future,Applicative and Monad are just the tip of the iceberg. Adding more and more methods will make our API&nbsp;very bloated. Furthermore, methods like map, flatMap, apply are more related to how the future object is used, rather than to its semantics (contrary to get and isDone which are).</p>
<p>&nbsp;</p>
<p>Inheritance will give us little gain. The methods are specific to each type (map for Option is not implemented like map for Future) and creating a huge inheritance that is again concerns usage semantics instead of entity semantics (a Future isn&#39;t a is-a Functor, rather, it has Functor properties)</p>
<p>&nbsp;</p>
<p>And what happen if we reallize a 3rd party implementation is a Functor?&nbsp;How can we add `map` to it?&nbsp;For example, Scala&#39;s Either doesn&#39;t have a map method.</p>
<p>&nbsp;</p>
<p>Finally, in one instance we required implicit conversion, which we can&#39;t automatically get through inheritance. Requiring users to import the right implicit conversion before using apply is confusing and is not self-revealing. The user has to know they exists to use them (where to import from). If we try to create an FPSupport object with all possible implicit conversions then it may just make things more confusing.</p>
<p>&nbsp;</p>
<p>So inheritance doesn&#39;t help us here. Again, following FP&nbsp;concepts, we can achieve all the above using something called type classes. But this is beyond the scope of this article</p>
<p>&nbsp;</p>
<p>And of course, this article is not complete without pointing to the &quot;reference&quot;&nbsp;implementation of FP in Scala:&nbsp;<a href="http://code.google.com/p/scalaz/">scalaz</a></p>
<p>&nbsp;</p>
<h2>
	A&nbsp;Word About Laws</h2>
<p>Implementations of Functor, Applicative and Monad must follow some laws to be vallid. In particular, so they don&#39;t influence the result. I&nbsp;didn&#39;t go over them, to avoid confusion, and since usually the natural implementation follows them, but readers should read about them if they want to create their own implementations</p>
<p>&nbsp;</p>
<h2>
	Further Reading</h2>
<p>I&nbsp;really enjoyed these blog posts:</p>
<p><a href="http://etorreborre.blogspot.com/2011/06/essence-of-iterator-pattern.html">The essense of the iterator pattern</a></p>
<p><a href="http://debasishg.blogspot.com/2011/07/datatype-generic-programming-in-scala.html">Dataype generic programming in Scala</a></p>
<p>&nbsp;</p>
<p>The blogs where these articles are found are great in general for FP as well as <a href="http://apocalisp.wordpress.com/">Apocalisp</a></p>
