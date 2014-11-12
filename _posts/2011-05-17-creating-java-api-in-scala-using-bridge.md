---
layout: post
title: 'Creating Java API in Scala using @bridge '
created: 1305634176
author: ittayd
permalink: /incubator/creating-java-api-scala-using-bridge
tags:
- Incubator
- Scala
---
<p>Someone asked me today how to write a service so its API&nbsp;can be used from Java. His problem is that he is using Scala's collection classes but it is not possible to use their methods from Java. This is because when using some features of Scala, the encoded method has a name that is not legal in Java (using '$' in particular).</p>
<p>&nbsp;</p>
<p>For example:</p>
<pre title="code" class="brush: scala;">
trait API {
  def service: Map[String, String]
}</pre>
<p>&nbsp;</p>
<p>If we call the method 'service' from Java, there's very little we can do with the result.</p>
<p>&nbsp;</p>
<p>The common wisdom is to create an adapter class that exposes Java consumable classes.&nbsp;Say, create a JavaAPI&nbsp;interface and JavaAPIImpl. This is very tedious and also tends to become very verbose since if another API interface returns our API interface it also requires wrapping so it will return a JavaAPI&nbsp;interface.</p>
<p>&nbsp;</p>
<p>An alternative can be to use the @bridge annotation introduced in Scala 2.9.0. Currently, the @bridge annotation is private, but I&nbsp;hope it will become public.</p>
<p>&nbsp;</p>
<p>The annotation is a very clever idea to achieve backward compatability while preventing new code from using deprecated methods. When a method is annotated with @bridge, the compiler will generate the bytecode for this method. However, when compiling other code, it will pretend that this method does not exist. So if we have a method 'foo', and we want to deprecate it, we annotate it with @bridge. The method continues to exist in bytecode, so classes that were compiled with the older version of the code continue to work. However, compiling new classes creates an error and requires us to modify the code and stop using this method. </p>
<p>&nbsp;</p>
<p>We can use this annotation to make a method that is visible only to Java classes:</p>
<pre title="code" class="brush: scala;">
import collection.JavaConversions
import annotation.bridge

trait API {
  def service: Map[String, String]

  @bridge def javaService = service.asJava
}</pre>
<p>&nbsp;</p>
<p>So when I&nbsp;compile Scala code that uses this trait, the compiler will not allow calls to 'javaService'. However, the method will be available in bytecode, so Java code can call it. </p>
<p>&nbsp;</p>
<p>&nbsp;</p>
