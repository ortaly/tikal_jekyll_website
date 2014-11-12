---
layout: post
title: Asynchronous functions, actors and CPS
created: 1278428009
author: ittayd
permalink: /java/asynchronous-functions-actors-and-cps
tags:
- JAVA
- Scala
- cps scala actors asynchronous
---
<p>Using<span style="mso-spacerun:yes">&nbsp; </span>Scala we can easily create lock free multi-threaded code, while still maintaining a familiar programming model.</p>
<p>&nbsp;</p>
<p class="MsoNormal">There are two issues of writing multi-threaded code: synchronizing shared access to resources and running code asynchronously. In Java this is usually done with locks and implementing interfaces that wrap the asynchronous code. This leads to code that is cumbersome to write, error prone and inefficient in how it uses threads (since a thread may block for an unspecified time waiting on a lock).</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">In Scala we have actors (of course there are actor libraries for Java also, they are just less popular). <span style="mso-spacerun:yes">&nbsp;</span>However, using actors means giving away on type safety (we cannot know the exact set of messages an actor handled) and is also cumbersome to use as a replacement for method calls.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Instead of just calling a method, one has to create a message and the actor needs to receive it and call the actual method. There are situations where actors provide the right abstraction, by being able to determine the order in which messages are handled, but this is not the focus of this post.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">In this post I&rsquo;d like to present an alternative way of programming, that will utilize actors behind the scenes, giving front stage to objects and method calls.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">First, let&rsquo;s model an asynchronous method. Such a method handles the computation in another thread. Since we don&rsquo;t want to block, we create a followup function that is called once the computation is done:</p>
<p class="MsoNormal"><b><br />
</b></p>
<pre title="code" class="brush: scala;">
def mult(i: Int, j: Int)(followup: Int =&gt; Unit)</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">We use it like:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
mult(3, 4) {r =&gt; println(r)}</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">In this case, implementing mult is trivial:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
def mult(i: Int, j: Int)(followup: Int =&gt; Unit) =
  followup(i * j)
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><br />
</b></p>
<p class="MsoNormal">(in general, followup should probably modeled as an Either of value or error, but I&rsquo;d like to keep things simple for this post)</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The body of mult runs in the thread of the caller. This is not good in the general case where a method modifies the state of an object, or where other methods modify the state and we want to avoid collisions.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">A way of synching all methods is through a use of an actor. The trivial way is to create an internal actor inside the object and send it messages that do the computation:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
class Obj {
  case class Mult(i: int, j: Int, followup: Int =&gt; Unit)
  def mult(i: Int, j: Int)(followup: Int =&gt; Unit) =
    impl ! Mult(i, j, followup)
 
  val impl = actor {
    loop {
      react {
       case Mult(i, j, followup) =&gt; followup(i * j)
      }
    }
  }
}
 
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">Of course<span style="mso-spacerun:yes">&nbsp; </span>this is very cumbersome. The messages are used internally and quite trivially. Instead, we can use the actor to evaluate functions that each method creates:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
trait AsyncSupport {
  val syncActor = actor {
    loop {
      react {
       case x: Function0[Unit]  =&gt; x()
      }
    }
  }
 
  def sync(body: =&gt; Unit) = syncActor ! {() =&gt; body}
}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal">(This is of course not a full implementation, need to add handling of the actor&rsquo;s exit and maybe explicit start)</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Then implementing mult is:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
class Obj extends AsyncSupport {
  def mult(i: Int, j: Int)(followup: Int =&gt; Unit) =
    sync{followup(i * j)}
} 
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">So far, so good. But when we start creating more and more such function, code starts to become unreadable. For example, consider the expression (a + b) * (c + d). With asynchronous methods this would be:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
add(a, b){r1 =&gt; add(c, d){r2 =&gt; mult(r1, r2)(followup)}}</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">One solution is to use for comprehension to hide the use of followup functions. Then code will look like:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
for (r1 &lt;- add(a,b);
       r2 &lt;- add(c,d)
      )  followup(mult(r1, r2))
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">This has several drawbacks: first, it isn&rsquo;t much more readable than the original code, second, it forces us to redesign our methods to conform to the rules of for comprehension, and thus make them less usable outside of its context.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Instead, we can use CPS</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">This post is not intended to introduce CPS, just to show its application here. I recommend searching for related articles (one linked below).</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">As a brief overview, CPS allows to take code that looks like this:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
expr1 {a =&gt; expr2(a)}</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">And turn it &ldquo;inside out&rdquo; into something like</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
reset {
  val a = shift {expr1}
  expr2(a)
}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&lsquo;shift&rsquo; and &lsquo;reset&rsquo; can be given other more descriptive names.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">For example, it allows taking this code:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
List(&quot;x&quot;,&quot;y&quot;,&quot;z&quot;).flatMap{left =&gt;
   List(4,5,6).flatMap{right =&gt;
     List((s,i))
  }
}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">And transforming it to:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
reset {
  val left = List(&quot;x&quot;,&quot;y&quot;,&quot;z&quot;)
  val right = List(4,5,6)
 
  List((left.reflect[Any], right.reflect[Any]))
}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">(I didn&rsquo;t include the definitions of &lsquo;reflect&rsquo;, you can find it here: <a href="http://dcsobral.blogspot.com/2009/07/delimited-continuations-explained-in.html">http://dcsobral.blogspot.com/2009/07/delimited-continuations-explained-in.html</a>)</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">This is close to the sugar magic being done by for comprehension:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
for (left &lt;- List(&quot;x&quot;,&quot;y&quot;,&quot;z&quot;);
       right &lt;- List(4,5,6))
    yield(List((left, right)))
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">So, in our case, the aim is to be able to rewrite</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
add(a, b){r1 =&gt; add(c, d){r2 =&gt; mult(r1, r2)(followup)}}</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">As something like:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
val r1 = add(a,b)
val r2 = add(c,d)
mult(r1, r2)
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">One way is to completely transform &lsquo;add&rsquo; and &lsquo;mult&rsquo; into CPS methods.</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
def add(i: Int, j: Int) = shift {k: (Int =&gt; Unit) =&gt; sync{k(i + j)}}
def mult(i: Int, j: Int) = shift {k: (Int =&gt; Unit) =&gt; sync{k(i * j)}}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black"><o:p>&nbsp;</o:p></span></b></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">And use it:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; def followup(r: Int) = println(&quot;Result: &quot; + r)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">followup: (r: Int)Unit</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; reset {</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r1 = add(1,2)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r2 = add(3,4)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r = mult(r1, r2)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; followup(r)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; | }</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">Result: 21</span><em><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></em></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal">A disadvantage with this approach is that now our methods are only usable in the context of CPS (&lsquo;reset&rsquo;). It means making it harder to do simple compositions or allow the &ldquo;straight forward&rdquo; use for those that want it.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Let&rsquo;s look again at the original definitions:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
def mult(i: Int, j: Int)(followup: Int =&gt; Unit) =
    sync{followup(i * j)}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal">It is obvious that &lsquo;followup&rsquo; is our &lsquo;k&rsquo; from the CPS code.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">So how do we go from a simple method with followup argument to a CPS method? With partial application:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-family: 'Courier New'; ">scala&gt; mult(3,4) _</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt"><span style="font-family: 'Courier New'; ">res3: ((Int) =&gt; Unit) =&gt; Unit = &lt;function1&gt;</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Arial"><o:p></o:p></span></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">The result of the partial application is a function that given a function (Int =&gt; Unit) will perform some computation.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">To use it, we define some syntactic sugar:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
  type Followup[Result] = Result =&gt; Unit
 
  class CpsSupport[Result](f: Followup[Result] =&gt; Unit) {
    def ! = shift {k: Followup[Result] =&gt; f(k) }
  }
 
  implicit def cps[Result](f: Followup[Result] =&gt; Unit) = new CpsSupport[Result](f)
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Verdana;color:black"><o:p>&nbsp;</o:p></span></b></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">Then, our methods are defined in the standard way, without CPS, and the usage is:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; reset {</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r1 = add(1, 2) _!</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r2 = add(3, 4) _!</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r = mult(r1, r2) _!</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; followup(r)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; | }</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p><span style="font-family: 'Courier New'; ">&nbsp;</span></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; Result: 21</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><em><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p>&nbsp;</o:p></span></em></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal">An alternative way is to put the body of &lsquo;!&rsquo; directly in &lsquo;cps&rsquo;:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<pre title="code" class="brush: scala;">
def cps[Result](f: Followup[Result] =&gt; Unit) = shift {k: Followup[Result] =&gt; f(k) }</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><br />
</b></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><b><span style="font-size:10.0pt;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black"><span style="mso-spacerun:yes">&nbsp;</span></span></b></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="mso-spacerun:yes">&nbsp;</span>and use it as:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; reset {</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r1 = cps(add(1, 2))</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r2 = cps(add(3, 4))</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; val r = cps(mult(r1, r2))</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; followup(r)</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">&nbsp;&nbsp;&nbsp;&nbsp; | }</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p><span style="font-family: 'Courier New'; ">&nbsp;</span></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="font-family: 'Courier New'; ">scala&gt; Result: 21</span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><em><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial"><o:p>&nbsp;</o:p></span></em></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal">(Note: The newlines between the calls to methods are required, otherwise Scala thinks that each line is a parameter to the previous one and complains that &lsquo;!&rsquo; takes no parameters)</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal">The methods &lsquo;add&rsquo; and &lsquo;mult&rsquo; need to explicitly use &lsquo;sync&rsquo; this is both to guard their body (&lsquo;i * j&rsquo;)<span style="mso-spacerun:yes">&nbsp; </span>and the call to followup, which maybe any code, including code that modifies the object and therefore needs to be synced. Instead, the method &lsquo;!&rsquo; can call sync. This can be done explicitly, or using an implicit adapter that receives &lsquo;k&rsquo; and adapts it. I leave this as an exercise for the reader.<span style="mso-spacerun:yes">&nbsp; </span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal">This adapter can further be used if the followup method is of arity higher than 1. In that case, &lsquo;k&rsquo; will be a function receiving a tuple and the adapter&rsquo;s job will be to convert it to FunctionN</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal"><span style="mso-spacerun:yes">&nbsp;</span></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><em><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Arial"><o:p>&nbsp;</o:p></span></em></p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><em><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:Arial"><o:p>&nbsp;</o:p></span></em></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">&nbsp;</p>
<p>&nbsp;</p>
