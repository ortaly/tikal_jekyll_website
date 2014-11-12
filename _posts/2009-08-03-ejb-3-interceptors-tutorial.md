---
layout: post
title: EJB 3 Interceptors tutorial
created: 1249323836
author: elad
permalink: /java/ejb-3-interceptors-tutorial
tags:
- JAVA
- Interceptor
- EJB 3
---
<ul>
    <li>This is a short tutorial for EJB 3 interceptors, and its purpose is to explain the concept of an interceptor and what is it good for.</li>
    <li>The content of this tutorial is a shrinked version of a tutorial posted here: <a href="http://www.mastertheboss.com/en/jboss-server/177-ejb-interceptors-in-depth.html">http://www.mastertheboss.com/en/jboss-server/177-ejb-interceptors-in-depth.html</a></li>
    <li>which also contains code example.</li>
    <li>&nbsp;</li>
    <li>EJB 3.0 interceptors allow you to add functionality to business methods of your session bean without modifying the methods' code.</li>
    <li>An interceptor is a method that's executed before any of the bean's business methods are invoked.</li>
</ul>
<ul>
    <li>&nbsp;&nbsp;</li>
    <li><strong>How does it work ? </strong></li>
    <li>When a method of the session bean is invoked, the Interceptor is also invoked.</li>
    <li>The interceptor has full access to the invoked method and its parameter.</li>
    <li>&nbsp;&nbsp;</li>
    <li><strong>Interceptors are particularly useful when you need to:</strong></li>
</ul>
<ol>
    <li>Validate parameters before they're passed to a business method</li>
    <li>Perform security checks at the time the business method is called.</li>
    <li>Perform other useful for actions such as logging and profiling without changing the code of your EJB.</li>
</ol>
<ul>
    <li>&nbsp;&nbsp;</li>
    <li><strong>On which kind of components can you apply Interceptors ?</strong></li>
    <li>Interceptors can be used on stateless session beans, stateful session beans, and message driven beans.</li>
    <li>&nbsp;</li>
    <li><strong>How many kinds of Interceptors can you apply ?</strong></li>
    <li>You can apply Interceptors at three different levels:</li>
    <li>&nbsp;</li>
    <li>1) <u>Default interceptors</u></li>
    <li>These interceptors needs to be declared in your ejb-jar.xml and are valid across all your EJB deployed :</li>
    <li>1.&nbsp;&nbsp;&nbsp; &lt;assembly-descriptor&gt;&nbsp;</li>
    <li>2.&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;interceptor-binding&gt;&nbsp;</li>
    <li>3.&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;ejb-name&gt;*&lt;/ejb-name&gt;&nbsp;</li>
    <li>4.&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;interceptor-class&gt;sample.interceptor.MyDefaultInterceptor&lt;/interceptor-class&gt;&nbsp;</li>
    <li>5.&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &lt;/interceptor-binding&gt;&nbsp;</li>
    <li>6.&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; ...&nbsp;</li>
    <li>7.&nbsp;&nbsp;&nbsp; &lt;/assembly-descriptor&gt;&nbsp;</li>
    <li>&nbsp;</li>
    <li>2) <u>Class level interceptors</u></li>
    <li>This is the kind of interceptor we've seen in our example: it is valid across all methods of an EJB.</li>
    <li>&nbsp;&nbsp; @Stateless</li>
    <li>&nbsp;&nbsp; @Interceptors(value=com.sample.SampleInterceptor.class)</li>
    <li>&nbsp;&nbsp; public class StatelessBean</li>
    <li>&nbsp;&nbsp; {</li>
    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ...</li>
    <li>&nbsp;&nbsp; }</li>
    <li>&nbsp;</li>
    <li>3) <u>Method level interceptors</u></li>
    <li>The method level interceptor only intercepts the single method call :</li>
    <li>&nbsp;</li>
    <li>&nbsp;&nbsp; @Interceptors(value=com.sample.MethodInterceptor.class)</li>
    <li>&nbsp;&nbsp; public void doSomething()</li>
    <li>&nbsp;&nbsp; {</li>
    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ...</li>
    <li>&nbsp;&nbsp; }</li>
    <li>&nbsp;</li>
    <li><strong>Order of Interception</strong></li>
    <li>First, the default interceptor is invoked, then Bean level interceptors and, at last, method level interceptors.</li>
    <li>If you declare a list of interceptors in your xml/annotations, then the interceptors are invoked in the order in which they were declared in the annotation.</li>
</ul>
<p>&nbsp;</p>
