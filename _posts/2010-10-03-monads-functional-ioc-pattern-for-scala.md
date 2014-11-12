---
layout: post
title: Monads - Functional IoC pattern for Scala
created: 1286093412
author: ittayd
permalink: /java/monads-functional-ioc-pattern-scala
tags:
- JAVA
- Scala
---
<p class="MsoNormal">This post is not yet another introduction to Monads. In fact, I hesitated whether to use the term in the title. Eventually I did, so I wouldn&rsquo;t get comments that the article is in fact about Monads. It is, but not for the reasons most articles are about.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">I want to discuss the design pattern that they offer. That is inversion of control between values and functions. Usually we think as values being the arguments to functions. But if we switch things around, making functions the argument of values, it can help make some code more concise and clear. It helps to model different code flows than <span style="font-family: &quot;Courier New&quot;;">foo(bar(car()))</span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Since I mentioned the word Monad, I need to give some kind of introduction. It is very superficial. I will then follow with some examples.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The article tries to reach those not very familiar with Scala, but I will use Scala syntax.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b><u>Explanation of Monads</u></b> (I know, there are hundreds like this&hellip;)</p>
<p class="MsoNormal">Monads can be thought of as a design pattern that allows chaining of functions/methods in non trivial way. In Scala, some constructs offer some syntactic sugar to work with them</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Essentially, a monad is a &ldquo;box&rdquo;. &ldquo;Monadic&rdquo; functions (or methods) put their result in the box and return the box.<span style="">&nbsp; </span>Other functions that require the value are passed to the monad, which extracts the value and calls the functionBy being in charge of calling the function the monad can add special behavior.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">There are some mathematical rules, to what is strictly considered a monad, but I won&rsquo;t dwell on them here. Google is your friend&hellip;</p>
<p class="MsoNormal">For the purpose of this article, a monad is a class M which looks like:</p>
<p class="MsoNormal">&nbsp;</p>
<pre class="brush: scala;" title="code">
class M[T](t: T) {
   def flatMap[U](f: T =&gt; M[U]): M[U]
}</pre>
<p class="MsoNormal">&nbsp;</p>
<ul>
    <li>A constructor that wraps the value</li>
    <li>A method that accepts functions that work on the value type, returning another monad
    <ul>
        <li>Note: the reason for the name flatMap is that this is the idiomatic Scala method. Using it Scala provides some syntactic sugar</li>
        <li>Of course it is easy to add an operator (e.g., &gt;&gt;= from Haskell) and use implicit conversions so that it is used instead of flatMap</li>
    </ul>
    </li>
</ul>
<p style="margin-left: 0cm;" class="MsoListParagraphCxSpLast">&nbsp;</p>
<p class="MsoNormal">Here are some examples:</p>
<p class="MsoNormal"><b><u>Optional Values</u></b></p>
<p class="MsoNormal">This first example is the one most familiar to Scala programmers. I present it here mainly as introductory to new comers. So it is both trivial and verbose.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">What do you do when a method needs to return an integer value, but sometime there is none? (For example, Map#get where values are integers and the key does not exist). People may opt to return an &ldquo;unreasonable&rdquo; value, such as Int.MaxValue, or return an Integer object and &lsquo;null&rsquo; when there is no value. Both of these approaches have two flaws:</p>
<p class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">The first (and least important for this discussion) is that it is not clear from the method declaration that you need to check on those special value. All you see is:</p>
<pre class="brush: scala;" title="code">
def foo : Int or def foo: Integer</pre>
<p style="text-indent: 36pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">The second is that in many cases we want to chain several methods, each can return &ldquo;no value&rdquo;. E.g., A student graduates if universityRegistry has student &ldquo;john&rdquo; and he has taken a course &ldquo;required&rdquo; and has gotten a grade and the grade is above 60. Anything else returns false. With returning null, the code looks like this</p>
<pre class="brush: scala;" title="code">
val student = studentRegistry .getStudent(studentName)

if (student == null) return false

val course = student.getCourse(courseName)

if (course == null) return false

val grade = course.grade

if (grade == null) return false

return grade &gt; 60</pre>
<p>&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">This is verbose and the style in general is error prone.</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Instead, use the Option[T] trait. It has two concrete implementations: Some[T] and None. Some carries an actual value and None has no value. A method definition is now:</p>
<pre class="brush: scala;" title="code">
def getStudent(name: String) : Option[Student]</pre>
<p style="margin-left: 1.45pt;" class="MsoNormal"><span class="k">The definition of flatMap is:</span></p>
<pre class="brush: scala;" title="code">
def flatMap[B](f: A =&gt; Option[B]): Option[B] =
   if (this.isEmpty) None else f(this.get)

</pre>
<p><span class="o">Explanation: If the option is a Some, then it applies the function to the boxed value. For None, it returns None (the function is not called)</span></p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Now convert all methods to return an Option:</p>
<pre class="brush: scala;" title="code">
StudentRegistry: def get(studentName: String): Option[Student]

Student: def getCourse(courseName: String): Option[Course]

Course: def grade: Option[Int]

</pre>
<p>And use:&nbsp;&nbsp;</p>
<pre class="brush: scala;" title="code">
studentRegistry.getStudent(studentName) flatMap

_.getCourse(courseName) flatMap

_.grade flatMap 

{g =&gt; Some(g &gt; 60)}

getOrElse false

</pre>
<p>&nbsp;</p>
<p>So studentRegistry#getStudent returns an Option, and the call to flatMap passes the function <span style="font-family: &quot;Courier New&quot;;">{x =&gt; x.getCourse}</span><span style="">&nbsp; </span>this produces an Option and it&rsquo;s flatMap is called with _.grade. The final function returns always a Some[Boolean]. The final line unboxes the monad, returning its value if it is a Some and false otherwise.</p>
<p>&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Maybe it is tricky to understand this code, if not already familiar with Scala, but it is shorter, and if either method returns None, the whole evaluation is short circuited to return false.</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Another advantage is that it is now clear from looking at the method signatures that they can return None.</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal"><b><u>Future Values</u></b></p>
<p style="margin-left: 1.45pt;" class="MsoNormal">What if you have a set of methods that compute a value asynchronously? You want to call each one when the previous has calculated its value. The code might look like:</p>
<pre class="brush: scala;" title="code">
val future1 = o.foo(&hellip;)

val val1 = future1.get

val future2 = val1.bar(&hellip;)

val val2 = future2.get</pre>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Of course this is both verbose but also locks the thread each time <a href="http://search.twitter.com/search?q=%23get">#get</a> is called.</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Instead, we can introduce a Future[T] monad. Chaining the functions means that the monad calls the function once its value has been set. Here is the code:</p>
<pre class="brush: scala;" title="code">
class Future[A] {

   self =&gt;

   def flatMap[B](f: A =&gt; Future[B]): Future[B] = new Future[B] {

     override def atEnd(g: B =&gt; Unit) = self.atEnd{v =&gt; f(v).atEnd(g)}

  }

  def atEnd(f: A =&gt; Unit) = synchronized {
    if (value.isDefined) f(value.get) else fvalue = f
  }

  def set(v: A) =  synchronized {
    value = Some(v)
    if (fvalue != null) fvalue(v)
  }

  var value: Option[A] = None

  var fvalue: A =&gt; Unit = null

}</pre>
<p>&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">(the implementation is rather trivial, to not get bogged down with details).</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">atEnd is a method to get us out of the monad. It accepts a function that will evaluate the value when it is ready. E.g., future.atEnd{v =&gt; println(&ldquo;the value is: &ldquo; + v)}</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">flatMap accepts a function but doesn&rsquo;t call it immediately. Instead, it creates a future whose atEnd will call the function. This future can now be used to chain more functions.<span style="">&nbsp; </span>(note that if using flatMap, you can&rsquo;t use atEnd and vice versa. Either you&rsquo;re in the monadic context or not)</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">The calls now look:</p>
<pre class="brush: scala;" title="code">
o.foo flatMap _.bar flatMap car(_)  atEnd println</pre>
<p style="margin-left: 1.45pt;" class="MsoNormal">This will call foo, calling bar method of the result when it is ready and passing the result when it is ready to the car method. Finally, to get out of the monadic context, atEnd is used to print the result</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">&nbsp;</p>
<p style="margin-left: 1.45pt;" class="MsoNormal">Here&rsquo;s an example:</p>
<pre class="brush: scala;" title="code">
scala&gt; def thread(body: =&gt; Unit) = {val t = new Thread(new Runnable{def run = body}); t.start}

thread: (body: =&gt; Unit)Unit

 

scala&gt; def f(i: Int) = {val fu = new Future[Int]; thread {Thread.sleep(2000); fu.set(i * 2)}; fu}

f: (i: Int)Future[Int]

 

scala&gt; f(2) flatMap f atEnd println

8

</pre>
<p>&nbsp;</p>
<p><b><u>Returning Many Results</u></b></p>
<p class="MsoNormal">Say you have functions that return several possible values. For example, the next possible moves in a game. <span style="">&nbsp;</span>Chaining such functions means that for each value one returns, the next function should be evaluated and so on, combining all values at the end.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">It just so happens that the Scala List collection can be used for this purpose. Here is how a method is defined:</p>
<pre class="brush: scala;" title="code">
def f(i: Int): List[Int]
</pre>
<p class="MsoNormal">and here is how to chain them</p>
<pre class="brush: scala;" title="code">
f flatMap g flatMap h</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b><u>Queries</u></b></p>
<p class="MsoNormal">Returning to the student registry example, assume all methods return their results by querying a database. We want to work in a transaction, so one way is to add an implicit parameter to all methods that encapsulates the underlying ORM.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">An alternative is for those methods to return a Query[T] monad. It does not box the result of the query, but the query itself. E.g., the JPQL string. Then flatMap just accumulates the functions. The final Query object can then be used to execute the queries one by one.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The benefit is that now the execution of the queries can be optimized, memorization of the functions can be used. And the programming style is more FP.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The implementation is similar to that of Future, so I won&rsquo;t repeat it here.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><span style="">I'd love to hear</span><span style=""> your thoughts in comments, or you can tweet me @ittayd<br />
</span></p>
