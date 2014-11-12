---
layout: post
title: Scala actors design patterns - part 4
created: 1291130637
author: ittayd
permalink: /java/scala-actors-design-patterns-part-4
tags:
- JAVA
- scala actors
- Scala
---
<p>This time, a short explanation on how to prioritize messages.</p>
<p>&nbsp;</p>
<p>In this example, the actor has two messages:&nbsp;Task(id) and Cancel(id). What happens if we send (several)&nbsp;Task messages and then want to cancel one of them? The following doesn't work:</p>
<pre title="code" class="brush: scala;">
loop {
  react {
    case Task(id) =&gt; ...
    case Cancel(id) =&gt; ....
  }
}</pre>
<p>&nbsp;</p>
<p>The reason is that the Task messages are before the Cancel message and so will be processed before processing it.</p>
<p>&nbsp;</p>
<p>The right way is the following:</p>
<pre title="code" class="brush: scala;">
loop {
  reactWithin(0) // (1)
    case Cancel(id) =&gt; canecellations += id // (2)
    case TIMEOUT =&gt;  // (3)
      react { 
        case Cancel(id) =&gt; () // oops, too late (4)
        case Task(id) =&gt;  // (5)
          if (!cancellations(id)) { 
            // process task
          } else {
            cancellations -= id
          }
      }
    }
  }
}
</pre>
<p>(1)&nbsp;reactWithin(0)&nbsp;means that the queueu is searched right then and if no matching message is found, a TIMEOUT is fired. In our case, we only match Cancel messages, so they will be handled right away before any Task</p>
<p>(2) Since Cancel is processed before Task, we need to remember that we're about to process a Task with the same ID.</p>
<p>(3) A&nbsp;TIMEOUT&nbsp;here means there are no Cancel messages in the queue. So we continue with regular processing using react</p>
<p>(4)&nbsp;A client may still send Cancel messages and we need to remove the from the queu</p>
<p>(5) Process the  Task message if no cancellation was found.</p>
<br />
