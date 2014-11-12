---
layout: post
title: Guava FluentIterable
created: 1410725536
author: oren.kleks
permalink: guava-fluentiterable
tags:
- JAVA
- Java Guava
---
<p>Guava <a href="http://docs.guava-libraries.googlecode.com/git/javadoc/com/google/common/collect/FluentIterable.html">FluentIterable </a>is part of the Guava collections library. It has great similarity to the Java 8 stream API.</p>

<p>This code filters a list with FluentIterable:</p>

<blockquote>
<p>from(cities).filter(city -&gt; city.contains(&ldquo;e&rdquo;)).transform(city -&gt; &ldquo;&lsquo;&rdquo;+city + &ldquo;&lsquo;&rdquo;).limit(2).join(on(&rdquo; &ldquo;));</p>
</blockquote>

<p>And this one produces the same result with Java 8 stream API:</p>

<blockquote>
<p>cities.stream().filter(city -&gt; city.contains(&ldquo;e&rdquo;)).map( city -&gt;&rdquo;&lsquo;&rdquo;+city+&rdquo;&lsquo;&rdquo;).limit(2).collect(joining(&rdquo; &ldquo;));</p>
</blockquote>

<p>Full code is available <a href="https://github.com/shrek2000/guava-playground/blob/master/com.tikal.hangout/src/main/java/com/tikal/hangout/guava/collections/FluentIterableSample.java">here</a>.</p>

<p>FluentIterable should be considered as useful if you still work with JDK 7 , and you want functional programming.</p>

<p>This blog is also available in http://oren.kleks.com/?p=36</p>
