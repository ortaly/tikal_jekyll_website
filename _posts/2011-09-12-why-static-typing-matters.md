---
layout: post
title: Why static typing matters
created: 1315827699
author: ittayd
permalink: /why-static-typing-matters
tags:
- JAVA
- static typing
- Scala
---
<p>This is a short post about an experience I had where the loss of type safety caused a nasty bug.</p>
<p>&nbsp;</p>
<p>Look at the following code:</p>
<pre title="code" class="brush: scala;">
val tenYearsFromNow:Long = System.currentTimeMillis + 10 * 365 * 24 * 60
* 60 * 1000</pre>
<p>&nbsp;</p>
<p><br />
It has a bug. Can you spot it?</p>
<p>&nbsp;</p>
<p>The bug is that 10 * 365 * 24 * 60 * 60 * 1000 is computed as an integer and oveflows. tenYearsFromNow then holds a value that is twenty days from now.</p>
<p>&nbsp;</p>
<p>Where I work this caused the server to stop functioning twenty days after being restarted...</p>
<p>&nbsp;</p>
<p>The bug was not detected by the compiler because of the Java/C legacy where the compiler automatically promotes integers to long. So the loss of type safety is what caused it to be undetected during compile time.</p>
<p>&nbsp;</p>
<p>Furthermore, this bug is not detected by unit tests (you don't wait 20 days...), so this is an example of how unit tests cannot cover the loss of type safety.</p>
<p>&nbsp;</p>
<p>Conclusion? Type safety matters.<br />
<br />
<br />
&nbsp;</p>
