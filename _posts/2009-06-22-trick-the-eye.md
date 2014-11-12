---
layout: post
title: Trick the eye
created: 1245700388
permalink: trick-the-eye
tags:
- JAVA
- Compiler
- code obfuscation
---
<p>I admit I was tricked:</p>
<p>&nbsp;</p>
<p><pre class="brush: java;">
import java.util.ArrayList;
public class ListProvider {
&nbsp; public static &lt;ArrayList&gt; ArrayList getList(ArrayList ar) {
&nbsp;&nbsp;&nbsp; return ar;
&nbsp; }
&nbsp; public static void main(String[] args) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; getList(&quot;I am a list&quot;);
&nbsp; }
}
</pre><br />
</collection></p>
<p>This code compiles and runs of course.</p>
