---
layout: post
title: My thoughts about node.js
created: 1331980187
author: ittayd
permalink: /my-thoughts-about-nodejs
tags:
- JS
- node.js
---
<p><strong>Update: </strong>It looks like the post is too long for <a href="http://adibaron.com/blog/2012/05/a-laymans-anti-nodejs-agenda/">some people</a>. So here is TL;DR:&nbsp;Node.js's sweet spot is where the server side is for integration work of fetching data from other sources (e.g. database)&nbsp;and when javascript is already used for the client side. </p>
<p>&nbsp;</p>
<p>So, node.js is a hot topic now. I&nbsp;wanted to share some of my views about this framework, some misconceptions related to it (IMHO) and maybe help deciding when to use it.&nbsp; If you find any mistakes, please comment!</p>
<p>&nbsp;</p>
<p>The first thing I want to discuss is the misconception (again, IMHO) that evented IO is more performant vs thread IO. Here is what happens when a process does IO&nbsp;(simplisticly):&nbsp;</p>
<ul>
    <li>The kernel puts the process in a waiting list. By &quot;putting&quot; I&nbsp;just mean pushing the reference to the data structure that represents the process to a list. Nothing fancy. But this means the process will not be scheduled for CPU time</li>
    <li>The kernel (through a driver)&nbsp;issues the IO&nbsp;command.</li>
    <li>It handles interrupts from the IO&nbsp;device until the data is read/written</li>
    <li>It moves the process (reference)&nbsp;back to the running list.</li>
    <li>When it turn comes, the process becomes &quot;running&quot;&nbsp;by restoring its stack and registers in the CPU and setting the program counter to the line that made the IO.</li>
    <li>The process then resumes running.</li>
</ul>
<p>&nbsp;</p>
<p>The same is true for native threads. They are just a process that shares an address space with another process. So when a thead is blocked on IO, it does not consume cpu resources. In fact, you can think of the above steps as an evented IO where the callback is to set the PC and resume the thread.</p>
<p>&nbsp;</p>
<p>What happens with node.js?&nbsp;Well, the same as the above, only when node.js gets an event it needs to fetch the javascript callback function from some data structure it holds and invoke it. So for node.js, IO requires an extra step.</p>
<p>&nbsp;</p>
<p>So are threads better suited for IO?&nbsp;Well, it depends if you need threads.</p>
<p>&nbsp;</p>
<p>Threads consume memory. In the JVM, a thread takes 512KB for its stack. While this can be changed with -Xss, it cannot be reduced to 0.</p>
<p>&nbsp;</p>
<p>Another thing is that when working with threads, one has to be careful when using shared resources, since concurrent modifications can cause corruption. In node.js, only one callback is executing at each given time, so this risk doesn't happen.</p>
<p>&nbsp;</p>
<p>However, node.js is just a single thread. What do you do if you have an 8 core machine and you want to utilize all of them?&nbsp;You use 8 node.js processes. But then, what happens if you do need a shared resource?&nbsp;Then concurrent modifications can happen (think writing to the same file), or it should be something that is guarded from these things (e.g. a database), but then such shared resources are also available to thread based applications.</p>
<p>&nbsp;</p>
<p>Another thing with node.js' single threadedness is that only one computation can progress at any given time. So if a node.js server does more than communicate with a database or other servers, it cannot progress on more than 1 request at a given time. Of course you can spawn more node.js processes, but then the memory benefits of single threadedness are gone.</p>
<p>&nbsp;</p>
<p>Moreover, evented IO exists in the JVM&nbsp;world&nbsp;(and ruby and python worlds), just not for standard servlets. And there are several http server frameworks that offer custom interfaces suitable for evented IO. But you also get threads, shared resources etc.</p>
<p>&nbsp;</p>
<p>Finally, javascript is slower than Java. While Google did an amazing job by creating V8, it is still <a href="http://shootout.alioth.debian.org/u32/which-programming-languages-are-fastest.php?java=on&amp;v8=on&amp;calc=chart">3 times slower compared with Java</a>. People sometimes&nbsp; mention context switching as an overhead when using threads, I&nbsp;don't believe it is such a big overhead, especially if the threads mainly wait for IO&nbsp;(if there are many that actually do something cuncurrently, then there must be a reason).</p>
<p>&nbsp;</p>
<p>So when is node.js useful&nbsp;(IMHO):</p>
<ul>
    <li>The server does little logic and involves mostly with fetching/pushing data to other servers. Then the performance hit doesn't really matter and the &quot;async&quot; first model out of the box is great for doing things right from the beginning.</li>
    <li>Your client side application is heavy on javascript (or coffeescript)&nbsp;so you know it already and want to share code between client and server side (e.g., validations)</li>
</ul>
<p>&nbsp;</p>
<p>HTH.</p>
<p>&nbsp;</p>
