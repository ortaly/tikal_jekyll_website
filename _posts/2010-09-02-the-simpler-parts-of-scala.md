---
layout: post
title: The simpler parts of Scala
created: 1283452425
author: ittayd
permalink: /java/simpler-parts-scala
tags:
- JAVA
- Scala
---
<p>There's a constant discussion about Scala being a complex language. In this post I'll try to show the simple parts of Scala that make coding easier.</p>
<p>&nbsp;</p>
<p>My favorite article about why Scala is not complex is by Martin Odersky, the father of Scala:&nbsp;http://lamp.epfl.ch/~odersky/blogs/isscalacomplex.html. But there's one problem with it, it appeals to those already in favor of Scala.</p>
<p>&nbsp;</p>
<p>I think Scala *is*&nbsp;complex. Some due to the functional concepts that are foreign to the Java world, some due to the requirement to work inside the JVM&nbsp;(and CLR). In fact, I&nbsp;was against Scala since 2006, because then I&nbsp;tried to learn it and found the syntax awkward. I&nbsp;recently had to start using it because a client required me to and haven't looked back since.</p>
<p>&nbsp;</p>
<p>Ok, so now to the actual post, why should you use Scala:&nbsp;because some parts of it make programming easier even for novices:</p>
<ul>
    <li>no need for parenthesis for argumentless methods</li>
    <li>usually no need for semicolon at the end of the line</li>
    <li>automatic getter and setter generation:&nbsp;declare a field as 'val' and the compiler generates a getter method for you. Declare the field as 'var' and a setter is also generated (these setters are according to Scala's idioms. If you want getXXX and setXXX, annotate the field with @BeanProperty)</li>
    <li>methods are public by default</li>
    <li>the constructor is part of the class definition - no need to declare 'class Foo' and then also 'public Foo(....)' constructor</li>
    <li>no need for 'return' (but you can use it if you want)</li>
    <li>type inference - no need to declare the type of a variable if the compiler can infer it (but you can if you want to)</li>
    <li>case classes - compiler automatically generates fields, accessor methods, hashCode(), equals() for you, no need for 'new' to create instances</li>
    <li>== is null safe and calls equals()&nbsp;(use eq for reference equality)</li>
</ul>
<p>All these mechanisms are not hard to grasp I think, and there are more (auto generated fields, lazy vals). Using these features you can code &quot;Java style&quot;, but write less code:</p>
<pre class="brush: scala;" title="code">
case class Person(name: String, age: Int)

val first = Person(&quot;first&quot;, 30) 
val second = Person(&quot;second&quot;, 20)

println(first.age)
if (first == second) {
  println(&quot;first and second are the same&quot;
}</pre>
<p>&nbsp;</p>
<p>Try writing the same code in java:&nbsp;class with two fields, accessor methods, hashCode, equals, creating two instances, calling methods, comparing instances. You can immediately see you write much more &quot;boring&quot;&nbsp;code. In Scala, the compiler does the grunt work for you.</p>
<p>&nbsp;</p>
<p>Some other more advanced (but still simple concepts):</p>
<ul>
    <li>traits allow to mix in several implementations. An example is a Logging trait tha declares a 'log' field. To use it you simply &quot;mix&quot;&nbsp;it into your class, so that you no longer need to declare 'private static Logger log = Logger.getLogger(MyLog.class)'.</li>
    <li>pattern matchers provide a better mechanism than if...else if...else if...</li>
    <li>collection classes that are much richer than Java's</li>
</ul>
<p>&nbsp;</p>
<p>As you become more and more proficient with Scala, you can use the more advanced mechanisms.</p>
<p>&nbsp;</p>
<p>Some counter arguments may be:</p>
<ul>
    <li>In a team, one developer can use advanced concepts and confuse the rest: That may be true, but then a developer can write complex and hard to understand code in any language. Such a developer needs to understand the coding standards in the team and &quot;simplify&quot;&nbsp;his code</li>
    <li>Scala 3rd party libraries are comples:&nbsp;true, usually Scala libraries are written to use the more advanced features of Scala. The solution is easy:&nbsp;don't use them. Any Java library can be used from Scala.</li>
</ul>
<p>&nbsp;</p>
<p>To summarise:&nbsp;Scala has a lot of features that will increase your development productivity. Start with these and learn the rest later.</p>
