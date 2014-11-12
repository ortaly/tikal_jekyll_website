---
layout: post
title: 'To Scala or not to Scala? '
created: 1256675923
author: ittayd
permalink: /java/scala-or-not-scala
tags:
- JAVA
- Scala
---
<p>I heard today I'm considered an advocate of Scala for a client I'm at. I came across Scala in 2006 and was at first very excite about it, but decided not to keep with it, so I thought I'd share my view of the language.</p>
<p>&nbsp;</p>
<p>So, why should you choose to use Scala:</p>
<ul>
    <li>
    <p>It is a type-safe functional language with nice syntax. There 	are languages (Ruby, Python, Javascript) that are functional, but 	not type safe. There's <a href="http://functionaljava.org/">Functional 	Java</a> but code becomes very cluttered with template parameters.</p>
    </li>
    <li>
    <p>Functional programming makes some code a lot shorter. You 	can google for many examples. For a short example, in Scala I can 	write</p>
    </li>
</ul>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#1a1a1a">		</font><font color="#000000">task(</font><font color="#2a00ff">&quot;foo&quot;</font><font color="#000000">)</font><font color="#1a1a1a"> </font><font color="#000000">{</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#1a1a1a">			</font><font color="#3f7f5f">// do stuff</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#1a1a1a">		</font><font color="#000000">}</font></font></font></p>
<p>where the task is invoked later. In Java you'd need to write:</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">		</font><font color="#7f0055"><b>new</b></font><font color="#000000"> Task(</font><font color="#2a00ff">&quot;foo&quot;</font><font color="#000000">) {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">			</font><font color="#7f0055"><b>public</b></font><font color="#000000"> </font><font color="#7f0055"><b>void</b></font><font color="#000000"> </font><font color="#000000"><u>execute()</u></font><font color="#000000"> {</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#000000">				</font><font color="#3f7f5f">// do some stuff</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000"><font face="Monospace"><font size="2">			}</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#000000"><font face="Monospace"><font size="2">		};</font></font></font></p>
<ul>
    <li>
    <p>Type safety is important to get IDE code completion and 	navigation as well as JIT optimizations (it's hard to compile 'a * 	b' to machine code unless you know what a and b are)</p>
    <ul>
        <li>
        <p>My experience with Ruby was that I did not miss this as code 		is easy to follow by reading it. In scala, things are different, 		see example below.</p>
        </li>
    </ul>
    </li>
</ul>
<ul>
    <li>
    <p>Scala has some cool features like operator methods ('a * b' 	means 'a.*(b)'), pattern matching (making switch statements a lot 	richer), multiple assignment, type inference, actors library, and 	more</p>
    </li>
    <li>
    <p>Scala can seamlessly use Java code. So you can use all your 	favourite libraries and frameworks.</p>
    </li>
    <li>
    <p>Type safety gives you some extent of code check.</p>
    </li>
    <li>
    <p>Scala is where all the cool kids hang.</p>
    </li>
</ul>
<p><br />
&nbsp;</p>
<p>So far, so good, right? Well, not so good:</p>
<ul>
    <li>
    <p>Scala's rich (as in a lot) syntax structures mean it is easy 	to get weird compilation errors. In essence, it is like being in C++ 	again. In dynamic-typed languages, the syntax tends to be a lot 	simpler (not needing to declare types), and so errors are easier to 	understand.</p>
    </li>
    <li>
    <p>All the idioms Scala provides means a lot of idioms to learn 	and master. People may say that you need not use all of them, which 	is true, but you probably need all of them to read others' code and 	to reason about it.</p>
    </li>
    <li>
    <p>While reading Scala code, a lot of compilation is going in 	your head. Granted, the code is shorter, but until you get used to 	the tricks done by the code to make it shorter, it is hard to 	understand just by glancing at it.</p>
    </li>
    <li>
    <p>For example, you might see a bit of code like &quot;<i>foo ?: 	bar</i>&quot;. What does it mean? You might want to know what the 	type of <i>foo</i> is, to open up its file and find the method <i>?:</i>. 	But <i>foo</i> is declared as '<i>val foo = car</i>'. Now <i>car</i> 	may not be in site. Why? because it is a method imported from some 	other package. How do you know which? If you're lucky, it is 	explicit (<i>import ....car</i>), but in Scala, many imports are for 	everything in a package (or type). Now say you figure out where <i>car</i> 	is and find its return type, so now you know what <i>foo</i>'s type 	is. Assume it turns out to be <i>Foo</i>. You try finding Foo.scala, 	but it doesn't exist, since scala allows to define many types in a 	single file and name it whatever you want. Finally you find that <i>Foo</i> 	is defined in Helpers.scala. You look for the method <i>?:</i>, but 	it is not there. Why? well you figure that in Scala, methods ending 	with colon are right associative, so the method is actually invoked 	on <i>bar</i>. You go through the process again and find that <i>Bar</i> 	is defined in file Util.scala. You open up that file, and no, 	there's no <i>?:</i> defined there. Why? because when the Scala 	compiler sees an object (class) does not support some method invoked 	on it, it looks for an implicit method that converts the object to 	another one which does support the method. So now you need to hunt 	for the implicit method. Finally you find it and there <i>?:</i> is 	in all its glory.</p>
    </li>
    <li>
    <p>Yes, I know, IDEs will help you find this at a click of a 	button. Still, IDE support is not robust enough yet (for me the 	Eclipse plugin provided just syntax highlighting and conflicted with 	the spring plugins and I had to resort to using IDEA). And also, for 	me, whenever I see code as in the above I need to &quot;compile&quot; 	it in my head to understand the flow.</p>
    </li>
    <li>
    <p>For those interested, ?: is not part of Scala, but an 	operator that can be added with 3 lines of code to mean 'if foo is 	not null, use its value, otherwise, use bar' where both foo and bar 	can be method calls that will be evaluated only if needed.</p>
    </li>
    <li>
    <p>Because Scala compiles to JVM bytecode, they had to do some 	tricks which are not easy to follow.</p>
    <ul>
        <li>
        <p>The reason I left scala can be found in this <a href="http://osdir.com/ml/lang.scala/2006-04/msg00022.html">thread</a>: 		basically, try to figure out the difference between:</p>
        </li>
    </ul>
    </li>
</ul>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#1a1a1a"><font face="Monospace"><font size="2">		</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>var</b></font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">cond</font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">=</font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>true</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font color="#1a1a1a"><font face="Monospace"><font size="2">		</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>for</b></font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">(</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>val</b></font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">x&lt;-List.range(0,10);cond){</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>if</b></font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">(x&gt;=5)cond=</font></font></font><font color="#7f0055"><font face="Monospace"><font size="2"><b>false</b></font></font></font><font color="#000000"><font face="Monospace"><font size="2">;</font></font></font><font color="#1a1a1a"><font face="Monospace"><font size="2"> </font></font></font><font color="#000000"><font face="Monospace"><font size="2">Console.println(x)}</font></font></font></p>
<p><br />
&nbsp;</p>
<p style="margin-left: 0.49in;">which prints 0 to 10</p>
<p style="margin-left: 0.49in;">and</p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#1a1a1a">		</font><font color="#7f0055"><b>var</b></font><font color="#1a1a1a"> </font><font color="#000000">cond</font><font color="#1a1a1a"> </font><font color="#000000">=</font><font color="#1a1a1a"> </font><font color="#7f0055"><b>true</b></font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in;"><font face="Monospace"><font size="2"><font color="#1a1a1a">		</font><font color="#7f0055"><b>for</b></font><font color="#1a1a1a"> </font><font color="#000000">(</font><font color="#7f0055"><b>val</b></font><font color="#1a1a1a"> </font><font color="#000000">x&lt;-List.range(0,10);{</font><font color="#7f0055"><b>if</b></font><font color="#1a1a1a"> </font><font color="#000000">(x&gt;=5)cond=</font><font color="#7f0055"><b>false</b></font><font color="#000000">;cond})</font><font color="#1a1a1a"> </font><font color="#000000">Console.println(x)</font></font></font></p>
<p><br />
&nbsp;</p>
<p><br />
&nbsp;</p>
<p>which prints 0 to 4.</p>
<p>What is the difference? It's hard to tell because it is all legal code. The secret (which I couldn't find then, but learned now because I had to) is that whateve is inside the parenthesis of the for statement is evaluated prior to executing the body (which is counter intuitive since it is not howregular  <i>for</i> and <i>while</i> behave). So in the firs example, cond is always evaluated to true, even though in the body it is set to false.</p>
<ul>
    <li>
    <p>See this <a href="http://creativekarma.com/ee.php/weblog/comments/the_scala_for_comprehension_from_a_java_perspective/">The 	Scala &ldquo;for comprehension&rdquo; from a Java perspective</a></p>
    </li>
</ul>
<ul>
    <li>
    <p>It is easy for people to create unreadable code: invent 	operators, use functions where not needed etc.</p>
    </li>
    <li>
    <p>Some libraries are not as robust as they are assumed to be. 	For example, the lift framework (a web framework) has abandoned the 	actors library of Scala because they found it to be hard to use due 	to its bugs (they created they're own actors library)</p>
    </li>
    <li>
    <p>The language is still evolving (2.8 will add named parameters 	for example).</p>
    </li>
    <li>
    <p>Compared to dynamic-typed languages, Scala still requires the 	compile-package-deploy cycle that Java defined.</p>
    </li>
</ul>
<p><br />
&nbsp;</p>
<p><br />
&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So, should you choose Scala? You should if:</p>
<ul>
    <li>
    <p style="margin-bottom: 0in;">You like functional programming, 	but don't want to loose on static typing (optimization, code 	completion)</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">You want to keep your team on edge 	with the latest advancements. This is not necessarily a bad thing. 	It can mean that people do not stagnate into doing repeated work but 	stay sharp as the learn new things.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">You are confident in your team to 	use the power of Scala to create readable code</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">You think that most innovations 	will be implemented in Scala and you want to be able to use them 	(while Scala can access Java code, the reverse is not always true 	since all the Scala features created un-intuitive JVM classes and 	methods).</p>
    <ul>
        <li>
        <p style="margin-bottom: 0in;">Examples are specs, scalatest, 		lift, akka</p>
        </li>
    </ul>
    <p style="margin-bottom: 0in;">&nbsp;</p>
    </li>
</ul>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">You should stick with Java if:</p>
<ul>
    <li>
    <p style="margin-bottom: 0in;">Your team members don't want to 	learn new things (Scala has a steep learning curve) or they will not 	be able to leverage the language correctly.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">You have a large existing code 	base and you don't see your existing framework changing. In this 	situation, you'll end up writing code in Scala that is just Java 	with different syntax.</p>
    </li>
</ul>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">You should use Jruby, Groovy or Jython if:</p>
<ul>
    <li>
    <p style="margin-bottom: 0in;">You want the agility of a 	dynamic-typed language with less syntactic structures</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">You are confident you'll write 	enough tests to cover the code</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Your are not concerned you need to 	squeeze every bit of performance (note that many large sites, with 	lots of traffic use php/ruby/python. Erlang, a language developed as 	a soft-runtime environment to develop phone switchboards, is 	dynamic-typed)</p>
    </li>
</ul>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">(I left Ruby, Ptyhon out of the equation as I assume most people will want to be able to use existing Java libraries and code)</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So why I decided to not keep with Scala back then: First, since I learned it for fun, I was not interested in searching for answers for the many problems I encountered trying to figure how code works. Second, for functional programming, I felt other languages&nbsp; did a better job at providing functional programming (and other idioms) while keeping the syntax simple and without compile-deploy cycle. But given an enterprise environment, where existing code base is important and so is performance, and with the right team of people, I'd definitly want to use it over Java.</p>
<ul>
    <ul>
        <p style="margin-bottom: 0in;">&nbsp;</p>
    </ul>
</ul>
<p>&nbsp;</p>
