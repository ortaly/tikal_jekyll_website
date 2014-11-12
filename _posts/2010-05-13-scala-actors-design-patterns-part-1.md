---
layout: post
title: 'Scala actors design patterns - part 1 '
created: 1273734701
author: ittayd
permalink: /java/scala-actors-design-patterns-part-1
tags:
- JAVA
- scala actors
- Scala
---
<p>&nbsp;This post is one of (hopefully) a series of design patterns for actor based programming. If you don&rsquo;t know what an actor based programming is, see <a href="http://en.wikipedia.org/wiki/Actor_model">http://en.wikipedia.org/wiki/Actor_model</a>. This post and the next will be focused on developing in <a href="http://www.scala-lang.org/">Scala</a>, using its standard <a href="http://www.scala-lang.org/node/242">actors library</a>.</p>
<p class="MsoNormal">Many times, working with actors involves a request-response cycle. For the context of this post, imagine a UniversityRegistry actor. The actor can register students, assign them to classes, whatever. One of the things we may want in such a system is to query for the state of a student. To do that, we can send a message <i>Query(id)</i> and expect a response with the student details.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">What should this response look like? A na&iuml;ve approach is to send a response of the form <i>Response(student)</i> to the sender, where the student object is an instance of the Student class used internally. This is wrong. The actors model is based on a share-nothing paradigm. Once you send an internal object outside, it might be access by different threads simultaneously, resulting in errors.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Another approach is to clone the object before sending it. This may have performance issues. Think of this student referencing to different course objects, which themselves reference other courses.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">We can create a transfer object that represents the internal objects in a way good for passing outside. A student transfer object (StudentTO) may not point directly to other objects, but instead contain their ids. If a client wants, he should query the system for any referenced object. This means a much more complex system to design, and also can lead to many queries. One can design a query language to treat actors like databases, but this is even more complex.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Another problem with all these issues is the need for a client to wait on a message specified by receiver. Imagine a worker interacting with several actor subsystems, needing to wait on each Response type of message. Not very nice.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">I want to propose a solution that is lightweight and avoids the above problems.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">The approach is simple. Instead of replying in a way defined by the actor, allow the client to pass in a function, that is executed in the context of the actor on the reply, extracts any information it requires and constructs a message to be sent to the client.</p>
<p class="MsoNormal">In pseudo code this looks like:</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><span class="apple-style-span"><span style="font-size:10.0pt;
line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><a href="http://scala-lang.org/"><b>case</b></a></span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066"><a href="http://scala-lang.org/"><b>class</b></a></span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">Student</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">(</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">...</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">)</span></span><span style="font-size:
10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span"><a href="http://scala-lang.org/"><b>case</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>class</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">Query</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">(</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">id</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:navy">:</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">String, f</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:navy">:</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">Student</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:navy">=&gt;</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">Any</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">)</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<br />
<span class="apple-style-span"><a href="http://scala-lang.org/"><b>class</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">StudentsRegistry</span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>extends</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">Actor</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#F78811">{</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp;</span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>override</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>def</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">act</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:navy">=</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">{</span></span><span style="font-size:
10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; loop</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#F78811">{</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; &nbsp; react</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#F78811">{</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; &nbsp; &nbsp;</span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>case</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">Query</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">(</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">id, f</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">)</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:navy">=&gt;</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span"><a href="http://scala-lang.org/"><b>val</b></a></span><span class="apple-converted-space">&nbsp;</span><span class="apple-style-span">r</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:navy">=</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">getResults</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">(</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">id</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">)</span></span><span style="font-size:
10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; sender</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:navy">!</span></span><span class="apple-converted-space"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">f</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">(</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#000066">r</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">)</span></span><span style="font-size:
10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp; &nbsp;</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#F78811">}</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp; &nbsp;</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#F78811">}</span></span><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
<span class="apple-style-span">&nbsp;</span><span class="apple-converted-space">&nbsp;</span></span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:115%;
font-family:&quot;Courier New&quot;;color:#F78811">}</span></span><span style="font-size:
10.0pt;line-height:115%;font-family:&quot;Courier New&quot;;color:#000066"><br />
</span><span class="apple-style-span"><span style="font-size:10.0pt;line-height:
115%;font-family:&quot;Courier New&quot;;color:#F78811">}</span></span></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:115%;font-family:&quot;Verdana&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Verdana;color:black"><o:p></o:p></span></b></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">There are two variations to this idea:</p>
<ul style="margin-top:0cm" type="disc">
    <li class="MsoNormal" style="mso-list:l0 level1 lfo1">Optional messages &ndash;      Sometimes the work the actor does is not a pure query. E.g. registering a      user produces an ID which the client might not care about. The passed in      function can then be required to return Option[Any]. If it returns None,      then no message is sent back</li>
    <li class="MsoNormal" style="mso-list:l0 level1 lfo1">Callbacks &ndash; a subsystem      can provide an observers mechanism. Clients can pass in partial functions      (pattern matches) which are called with the different events. If the      function is not defined for an event, then no message is sent. This can be      combined with the above variation.</li>
</ul>
<p>&nbsp;</p>
