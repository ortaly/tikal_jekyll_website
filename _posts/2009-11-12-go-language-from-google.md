---
layout: post
title: Go language from Google
created: 1258032032
author: andrew
permalink: /net/go-language-google
tags:
- .NET
---
<p>&nbsp;Google announced about new experimental language named &quot;Go&quot;. People joke that next will be a debugger named &quot;ogle&quot;.</p>
<p>&nbsp;</p>
<p>So this language is supposed to replace C and is compiled to machine code, but it includes some features of modern dynamic languages, like garbage collection, lightweight threads (like in Erlang), built-in map type (so missing in Java), cool syntax, type safety, adequate packaging (no more ugly #includes), etc. etc.</p>
<p>&nbsp;</p>
<p>Here are some links:&nbsp;</p>
<p>&nbsp;</p>
<p>Language spec:&nbsp;http://golang.org/doc/go_spec.html</p>
<p>Effective Go:&nbsp;http://golang.org/doc/effective_go.html</p>
<p>&nbsp;</p>
<p>Example of code creating 100 thousands of threads and counting them:</p>
<p>&nbsp;</p>
<p>
<p>package main</p>
<p>&nbsp;</p>
<p>import (&quot;flag&quot;; &quot;fmt&quot;)</p>
<p>&nbsp;</p>
<p>var ngoroutine = flag.Int(&quot;n&quot;, 100000, &quot;how many&quot;) //command line parameter &quot;n&quot; with default of 100000</p>
<p>&nbsp;</p>
<p>func f(left, right chan int) { left &lt;- 1 + &lt;-right } //this function runs on thread, reading int from right and writing incremented int to left channel</p>
<p>&nbsp;</p>
<p>func main() {</p>
<p>&nbsp;&nbsp;flag.Parse();</p>
<p>&nbsp;&nbsp;leftmost := make(chan int);</p>
<p>&nbsp;&nbsp;var left, right chan int = nil, leftmost;</p>
<p>&nbsp;&nbsp;</p>
<p>&nbsp;&nbsp;for i := 0; i &lt; *ngoroutine; i++ {</p>
<p>&nbsp;&nbsp; &nbsp;left, right = right, make(chan int);</p>
<p>&nbsp;&nbsp; &nbsp;go f(left, right); &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; //this statement starts a new goroutine (light thread)</p>
<p>&nbsp;&nbsp;}</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;right &lt;- 0; // bang! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;//write to the last channel</p>
<p>&nbsp;&nbsp;x := &lt;-leftmost; // wait for completion &nbsp; &nbsp; &nbsp;//read from the first channel after it travelled all the chain</p>
<p>&nbsp;&nbsp;fmt.Println(x); // 100000</p>
<p>}</p>
<div>&nbsp;</div>
</p>
