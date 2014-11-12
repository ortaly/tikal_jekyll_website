---
layout: post
title: Introspection and private namespaces in AS3
created: 1255512951
author: sefi
permalink: /js/introspection-and-private-namespaces-as3
tags:
- JS
- namespace
- introspection
- flex
- AS3
---
<p>Hello!</p>
<p>Today, we are going to discuss introspection and private namespaces in AS3/Flex!</p>
<p>&nbsp;</p>
<p>The motivation to use private namespaces in the context of introspection is to be able to expose API implemented in your class in a way that is not <strong>public</strong> (everyone can use it), <strong>protected </strong>(only inheriting classes can use it) or <strong>private </strong>(only the class can use it).</p>
<p>&nbsp;</p>
<p>Consider this: You are implementing a framework, and one of the classes (<em>ClassA</em>) is used both by the framework users (<em>external</em>) and within the framework (<em>internal</em>). That means that all the functionality in <em>ClassA </em>that is intended for <em>external </em>use must be <strong>public</strong>. Unfortunately, so does the functionality intended for <em>internal </em>use.</p>
<p>&nbsp;</p>
<p>If you would like to prevent exposing the internal API to the outside world, but still use it internally, <strong>private namespaces</strong> is the way to go!</p>
<p>&nbsp;</p>
<p>Basically, these are the steps to use private namespaces:</p>
<p><br />
1. Define the <strong>namespace</strong>:</p>
<pre class="brush: as3;">
namespace nameSpace;</pre>
<p>&nbsp;</p>
<p>2. Use the <strong>namespace </strong>instead of an access control specifier in a variable or function declaration:</p>
<pre class="brush: as3;">
namespace function myFunc() {}</pre>
<p>&nbsp;</p>
<p>3. Now, use it:</p>
<pre class="brush: as3;">
use namespace namespace;

myFunc();</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>So, without further ado, let's get down to business.</p>
<p>&nbsp;</p>
<p>First, we'll create the <strong>namespace </strong><em>(file namespace/nameSpace.as)</em>:</p>
<pre class="brush: as3;">
package namespace {

   // URIs default to {package}.{namespace defined in this file}, I am overriding this here.

   public namespace nameSpace = &quot;com.tikalk.private.namespace&quot;;

}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Second, we'll create the <em>ClassA </em>mentioned above <em>(file example/ClassA.as)</em>:<br />
&nbsp;</p>
<pre class="brush: as3;">
package example {

   import namespace.nameSpace;

   public class ClassA {

    nameSpace function func1():void {}
    nameSpace var tempVar:Object;
    public function func2():void {}
   }
}</pre>
<p>&nbsp;</p>
<p>Now, any class <em>ClassB </em>that uses <em>ClassA </em>will be able to access <em>func2</em>.<br />
But, to access <em>func1 </em>and tempVar, <em>ClassB </em>would have to import the <strong>namespace </strong>and use it:</p>
<pre class="brush: as3;">
import namespace.nameSpace;
use namespace nameSpace;
func1();
</pre>
<p>&nbsp;</p>
<p>I have created an example, will post it later today.</p>
<p>&nbsp;</p>
