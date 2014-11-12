---
layout: post
title: Scala actors design patterns - part 3
created: 1277631911
author: ittayd
permalink: /java/scala-actors-design-patterns-part-3
tags:
- JAVA
- scala actors
- Scala
---
<p>&nbsp;Actors process messages one at a time. But what if processing a message is a read-only process? Why not be able to process them simultaneously?</p>
<p>&nbsp;</p>
<p class="MsoNormal">I&rsquo;ll first show a direct implementation of the pattern and then a trait that can be reused.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">First, assume we have 2 messages<span style="mso-spacerun:yes">&nbsp; </span>for that stand for a read operation and for a write operation (the parameter i is used for print-debug to keep track of what message is processed):</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
case class Read(i: Int)
case class Write(i: Int)</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">We would like to process Read messages simultaneously. The actor itself cannot do that, but it can run another actor which will. So the strategy is to forward Read handling to a temporary actor and maintain a count for all readers, so that we don&rsquo;t process a Write message while any Read message is being handled. When the handling of Read is finished by the temporary actor to the &ldquo;parent&rdquo; one. This message is handled before others (and not pushed to the end of the queue). Another aspect is that we want to prevent starvation, so when encountering a Write message we then stop processing new Read messages to allow all read operations to finish so the Write message can be processed.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Here is the code:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
class RwActor extends Actor {
    private case class ReadFinished()
   
    var readers = 0
    var writer: Option[Write] = None
   
    def executeWrite(w: Write) = println(&quot;no readers, executing writer &quot; + w.i)
   
    def executeRead(parent: Actor, r: Read) = actor {
       println(&quot;Executing reader &quot; + r.i)
       Thread.sleep(2000)
       println(&quot;Finished reader &quot; + r.i)
       parent ! ReadFinished()
    }
   
    def readerFinished = {
       readers -= 1
       println(&quot;Readers: &quot; + readers)
       if (readers == 0 &amp;&amp; writer.isDefined) {
               executeWrite(writer.get)
               writer = None
       }
    }
   
    def act =
       loop {
         reactWithin(0) {
           case ReadFinished() =&gt; readerFinished
           case TIMEOUT =&gt;
               react {
                 case w@Write(i) if writer.isEmpty =&gt;
                   println(&quot;Got writer &quot; + i)
                   if (readers == 0) executeWrite(w)
                   else writer = Some(w)
                 case r: Read if writer.isEmpty =&gt;
                   readers += 1
                   executeRead(Actor.self, r)
                 case ReadFinished() =&gt; readerFinished
               }
           }
       }
} 
</pre>
<p>Here how it looks when used:</p>
<p>&nbsp;</p>
<pre>
scala&gt; val rw = new RwActor</pre>
<p class="MsoNormal">rw: RwActor = RwActor@cc74e7</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">scala&gt; rw.start</p>
<p class="MsoNormal">res12: scala.actors.Actor = RwActor@cc74e7</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">scala&gt; rw ! Read(0)</p>
<p class="MsoNormal">Executing reader 0</p>
<p class="MsoNormal">scala&gt; rw ! Read(1)</p>
<p class="MsoNormal">Executing reader 1</p>
<p class="MsoNormal">scala&gt; rw ! Write(0)</p>
<p class="MsoNormal">Got writer 0</p>
<p class="MsoNormal">scala&gt; rw ! Read(2)</p>
<p class="MsoNormal">scala&gt;</p>
<p class="MsoNormal"><span style="mso-spacerun:yes">&nbsp;</span>Finished reader 0</p>
<p class="MsoNormal">Readers: 1</p>
<p class="MsoNormal">Finished reader 1</p>
<p class="MsoNormal">Readers: 0</p>
<p class="MsoNormal">no readers, executing writer 0</p>
<p class="MsoNormal">Executing reader 2</p>
<p class="MsoNormal">Finished reader 2</p>
<pre>
&nbsp;</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">You can see that the message Read(1) is processed before Read(0) finished and Read(2) is not processed until Write is processed.</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">To create a more generic actor, we can create a trait to tag Read-Only messages:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
trait ReadOnly
</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal">Then a RwActor trait can redefine #react to provide a wrapping for the partial function that is passed:</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<pre title="code" class="brush: scala;">
trait RwActor extends Actor {
    private case class ReadFinished()
 
    var readers = 0
    var writer: Option[Any] = None
   
    def readerFinished(f: PartialFunction[Any, Unit]) = {
       readers -= 1
       println(&quot;Readers: &quot; + readers)
       if (readers == 0 &amp;&amp; writer.isDefined) {
           println(&quot;Executing writer &quot; + writer.get); f(writer.get)
           writer = None
       }
    }
 
    override def react(f: PartialFunction[Any, Unit]): Nothing = {
       reactWithin(0) {
         case ReadFinished() =&gt; readerFinished(f)
 
         case TIMEOUT =&gt;
             super.react {
                 case ReadFinished() =&gt; readerFinished(f)
 
                 case m if f.isDefinedAt(m) &amp;&amp; writer.isEmpty =&gt;
                     m match {
                         case m: ReadOnly =&gt;
                             readers += 1
                             val original = Actor.self
                             actor {println(&quot;Executing reader &quot; + m); f(m); original ! ReadFinished()}
                         case m =&gt;
                             if (readers == 0) {println(&quot;Executing writer &quot; + m); f(m)}
                             else writer = Some(m)
                     }
                            
             }
       }
    } 
}
</pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal">To use:</p>
<p class="MsoNormal">&nbsp;</p>
<pre title="code" class="brush: scala;">
case class Add(i: Int)
case class Get(n: Int) extends ReadOnly
 
val rw = new RwActor {
   def act = loop {
       react {
          case Add(i) =&gt; println(&quot;Adding &quot; + i)
          case Get(i) =&gt; println(&quot;Getting &quot; + i); Thread.sleep(2000)
       }
   }
}
 </pre>
<p class="MsoNormal" style="margin-bottom:0cm;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><b><br />
</b></p>
