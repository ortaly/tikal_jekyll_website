---
layout: post
title: coroutines in python
created: 1247255002
author: andrew
permalink: /java/coroutines-python
tags:
- JAVA
- Python
- asynchronous
---
<p>An interesting feature of python: support for coroutines:&nbsp;<a href="http://www.python.org/dev/peps/pep-0342/">http://www.python.org/dev/peps/pep-0342/</a></p>
<p>&nbsp;</p>
<p>coroutines allow suspending one routine and switching to another and then resuming from the same point. It can be achieved with multithreading with the following pseudo-code</p>
<p>&nbsp;</p>
<p>routine1 ():</p>
<p>&nbsp;&nbsp;while true:</p>
<p>&nbsp;&nbsp; &nbsp;//do something</p>
<p>&nbsp;&nbsp; &nbsp;raise event2</p>
<p>&nbsp;&nbsp; &nbsp;wait event1</p>
<p>&nbsp;&nbsp; &nbsp;//continue execution when routine2 raises event1</p>
<p>&nbsp;</p>
<p>routine2 ():</p>
<p>&nbsp;&nbsp;while true:</p>
<p>&nbsp;&nbsp;//do something</p>
<p>&nbsp;&nbsp;raise event1</p>
<p>&nbsp;&nbsp;wait event2</p>
<p>&nbsp;&nbsp;//continue when routine 1 raises event2</p>
<p>&nbsp;</p>
<p>So these 2 routines advance passing control to one another and continuing execution from the point where it left the last time. The problem is we use 2 threads where only one is executing in any point of time.</p>
<p>&nbsp;</p>
<p>In python it's possible to use &quot;yield&quot; to do the same in one thread, and also to pass values between the coroutines.</p>
<p>&nbsp;</p>
<p>More about coroutines can be found here:&nbsp;<a href="http://en.wikipedia.org/wiki/Coroutine">http://en.wikipedia.org/wiki/Coroutine</a></p>
