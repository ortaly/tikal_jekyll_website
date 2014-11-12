---
layout: post
title: Injecting request scope beans into singletons with RESTeasy and Spring
created: 1293549987
author: andrew
permalink: /java/injecting-request-scope-beans-singletons-resteasy-and-spring
tags:
- JAVA
- rest spring aop resteasy jersey
---
<p>Spring has a nice feature, which is often overlooked: a bean with shorter life-cycle can be injected into a bean with a longer life-cycle. A classic example is singleton for MVC controller and a request-scope bean for DAL. This is achieved in Spring with defining a proxy bean like this:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: xhtml;">
&lt;bean id=&quot;booksDao&quot; class=&quot;my.dal.BooksDao&quot; scope=&quot;request&quot;&gt;
  &lt;aop:scoped-proxy /&gt;
&lt;/bean&gt;

&lt;bean id=&quot;booksFacade&quot; class=&quot;my.web.BooksFacade&quot;&gt;
  &lt;property name=&quot;dao&quot; ref=&quot;booksDao&quot;/&gt;
&lt;/bean&gt;</pre>
<p>&nbsp;</p>
<p>This way, booksDao can be accessible from any beans processing the request, and Spring will ensure it's the same instance during the same request, and different instance for different requests.</p>
<p>&nbsp;</p>
<p>Under the hood it's implemented with a proxy object. So booksFacade in reality holds a reference to a proxy object, which looks up the current request context in ThreadLocal storage and forwards all your method calls to the request-scoped booksDao.</p>
<p>&nbsp;</p>
<p>If your application is Spring based all-around, the necessary preparations are done in Spring's DispatcherServlet.</p>
<p>&nbsp;</p>
<p>But if you are using RESTEasy (or jersey), you have to use the different servlet. So when your booksFacade will try to access its dao, it will not find the request context in ThreadLocal storage and throw an exception.</p>
<p>&nbsp;</p>
<p>Fortunately, Spring provides 2 alternative ways to fill the request context when you are not using DispatcherServlet. One is RequestContextListener and the other is RequestContextFilter. You need to add one of them to your web.xml. Filter better suits the cases when some URLs should have this context and some should not.</p>
<p>&nbsp;</p>
<p>In most cases, you want all requests to pass through Spring handler and have a correct request context. To achieve this, you simply have to add to your web.xml these lines:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: xhtml;">
&lt;listener&gt;
   &lt;listener-class&gt;org.springframework.web.context.request.RequestContextListener&lt;/listener-class&gt;
&lt;/listener&gt;</pre>
<p>&nbsp;</p>
<p>Now the booksDao proxy will work as expected, and you can access the request scoped beans from singletons when necessary.</p>
<p>&nbsp;</p>
<p>
<meta charset="utf-8">
<meta charset="utf-8">
<meta charset="utf-8">  </meta>
</meta>
</meta>
</p>
