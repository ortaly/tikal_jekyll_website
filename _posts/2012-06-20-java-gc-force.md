---
layout: post
title: Java gc force
created: 1340187186
author: chaim.turkel
permalink: /java/blog/java-gc-force-0
tags:
- JAVA
---
<p><span style="font-family: Arial;">We all know the need to accasinally run the garbage collector.</span></p>
<p><span style="font-family: Arial;">The JVM by design does not allow you to force the garbage collector to run.</span></p>
<p><span style="font-family: Arial;">Using functions like System.gc(); or Runtime.getRuntime().gc(); only suggest to the JVM that you want to run the garbage collector.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: Arial;">I found a way on the internet not to force the grabage collector but to wait until the garbage collector runs.</span></p>
<p><span style="font-family: Arial;">The idea is to use the <code><span class="typ">WeakReference</span> object. This object holds a pointer to the object, but is not counted as a pointer by the garbage collector.</code></span><code> You then release the actual pointer but continue to check the object via the </code><span style="font-family: Arial;"><code><span class="typ">WeakReference</span><span class="pln"> pointer until it is null.<br />
</span></code></span></p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
/**
    * This method guarantees that garbage collection is
    * done unlike &lt;code&gt;{@link System#gc()}&lt;/code&gt;
    */
   public static void gc() {
     Object obj = new Object();
     WeakReference ref = new WeakReference&lt;Object&gt;(obj);
     obj = null;
     while(ref.get() != null) {
       System.gc();
     }
   }
</pre>
<pre class="lang-java prettyprint">
<span style="font-size: larger;"><span style="font-family: Arial;"><code><span class="pun">  For more information please see: http://jlibs.googlecode.com/svn/trunk/core/src/main/java/jlibs/core/lang/RuntimeUtil.java<br /></span></code></span></span><code><span class="pln"><br /></span></code></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
