---
layout: post
title: LMS generates javascript from Scala code
created: 1331407267
author: ittayd
permalink: /lms-generates-javascript-scala-code
tags:
- Incubator
- scala javascript
- Scala
---
<p>&quot;Scala virtualized&quot; is a new feature of Scala (still in development)&nbsp;that allows to create very sophisticated DSLs that look like normal code. In essense, code written in such DSL&nbsp;does not evaluate a result, but evaluates to an expression tree. The tree can then be analyzed, optimized and code can be generated from it.</p>
<p>&nbsp;</p>
<p>An interesting usage is generating Javascript code from Scala code. So you write code on the server side that is type safe (navigatable, checked), using utilities you already have, and javascript code is generated.</p>
<p>&nbsp;</p>
<p>For example:&nbsp;</p>
<pre class="brush: scala;" title="code">
def test(n: Rep[Int]): Rep[Array[Int]] =
  for (i &lt;range(0, n); j &lt;range(0, n)) 
    yield i*j
</pre>
<p><br />
Will generate the following javascript code</p>
<pre class="brush: jscript;" title="code">
function test(x0) {
  var x6 = []
  for(var x1=0;x1&lt;x0;x1++){
    var x4 = []
    for(var x2=0;x2&lt;x0;x2++){
      var x3 = x1 * x2
      x4[x2]=x3
    }
    x6.splice.apply(x6, [x6.length,0].concat(x4))
  }
  return x6
}</pre>
<p>&nbsp;</p>
<p>Nowdays, when CoffeeScript is used instead of Javascript, and Less instead of CSS, I&nbsp;don't think the extra compilation step is a major hassle. However, it's obvious (to me at least) that an approach as the above can only work if the server side has the major amount of logic and the client side javascript is minor.</p>
