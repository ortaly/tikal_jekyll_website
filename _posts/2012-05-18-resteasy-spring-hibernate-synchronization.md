---
layout: post
title: Resteasy spring hibernate synchronization
created: 1337357484
permalink: resteasy-spring-hibernate-synchronization
tags:
- JAVA
- Spring
- Hibernate
- spring resteasy
---
<p>The project i am working on is a combination of Springs , Hibernate and  Resteasy services. In this project i need to get the data from mysql  database using hibernate and Springs is used of configuring all the  service and Impl classes.<br />
It has two methods which return database data in xml and json format  using reseasy procedures.I have configured every thing correctly and the  output is generated correctly but the problem is <font color="#ff0000"><u>&quot;The  same code is sometimes producing the output and sometimes not&quot;(It is  giving a null pointer exception and stack trace is as follows).<br />
<br />
</u></font>SEVERE: Servlet.service() for servlet [Resteasy] in context with path [/resteasy] threw exception<br />
org.jboss.resteasy.spi.UnhandledException: java.lang.NullPointerException<br />
at org.jboss.resteasy.core.SynchronousDispatcher.hand  leApplicationException(SynchronousDispatcher.java:  323)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.hand  leException(SynchronousDispatcher.java:199)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.hand  leInvokerException(SynchronousDispatcher.java:175)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.getR  esponse(SynchronousDispatcher.java:529)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.invo  ke(SynchronousDispatcher.java:491)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.invo  ke(SynchronousDispatcher.java:120)<br />
at org.jboss.resteasy.plugins.server.servlet.ServletC  ontainerDispatcher.service(ServletContainerDispatc  her.java:200)<br />
at org.jboss.resteasy.plugins.server.servlet.HttpServ  letDispatcher.service(HttpServletDispatcher.java:4  8)<br />
at org.jboss.resteasy.plugins.server.servlet.HttpServ  letDispatcher.service(HttpServletDispatcher.java:4  3)<br />
at javax.servlet.http.HttpServlet.service(HttpServlet  .java:722)<br />
at org.apache.catalina.core.ApplicationFilterChain.in  ternalDoFilter(ApplicationFilterChain.java:304)<br />
at org.apache.catalina.core.ApplicationFilterChain.do  Filter(ApplicationFilterChain.java:210)<br />
at org.apache.catalina.core.StandardWrapperValve.invo  ke(StandardWrapperValve.java:224)<br />
at org.apache.catalina.core.StandardContextValve.invo  ke(StandardContextValve.java:169)<br />
at org.apache.catalina.authenticator.AuthenticatorBas  e.invoke(AuthenticatorBase.java:472)<br />
at org.apache.catalina.core.StandardHostValve.invoke(  StandardHostValve.java:168)<br />
at org.apache.catalina.valves.ErrorReportValve.invoke  (ErrorReportValve.java:100)<br />
at org.apache.catalina.valves.AccessLogValve.invoke(A  ccessLogValve.java:929)<br />
at org.apache.catalina.core.StandardEngineValve.invok  e(StandardEngineValve.java:118)<br />
at org.apache.catalina.connector.CoyoteAdapter.servic  e(CoyoteAdapter.java:405)<br />
at org.apache.coyote.http11.AbstractHttp11Processor.p  rocess(AbstractHttp11Processor.java:964)<br />
at org.apache.coyote.AbstractProtocol$AbstractConnect  ionHandler.process(AbstractProtocol.java:515)<br />
at org.apache.tomcat.util.net.JIoEndpoint$SocketProce  ssor.run(JIoEndpoint.java:304)<br />
at java.util.concurrent.ThreadPoolExecutor.runWorker(  ThreadPoolExecutor.java:1110)<br />
at java.util.concurrent.ThreadPoolExecutor$Worker.run  (ThreadPoolExecutor.java:603)<br />
at java.lang.Thread.run(Thread.java:722)<br />
Caused by: java.lang.NullPointerException<br />
at com.filter.rest.guiimpl.FilterRestServiceImpl.list  NodesXML(FilterRestServiceImpl.java:37)<br />
at sun.reflect.GeneratedMethodAccessor41.invoke(Unkno  wn Source)<br />
at sun.reflect.DelegatingMethodAccessorImpl.invoke(De  legatingMethodAccessorImpl.java:43)<br />
at java.lang.reflect.Method.invoke(Method.java:601)<br />
at org.jboss.resteasy.core.MethodInjectorImpl.invoke(  MethodInjectorImpl.java:140)<br />
at org.jboss.resteasy.core.ResourceMethod.invokeOnTar  get(ResourceMethod.java:252)<br />
at org.jboss.resteasy.core.ResourceMethod.invoke(Reso  urceMethod.java:217)<br />
at org.jboss.resteasy.core.ResourceMethod.invoke(Reso  urceMethod.java:206)<br />
at org.jboss.resteasy.core.SynchronousDispatcher.getR  esponse(SynchronousDispatcher.java:514)<br />
... 22 more<br />
<br />
<br />
Spring version is 3.0.4 RELEASE<br />
Springsecurity version 3.03 RELEASE<br />
Resteasy version 2.0.1 GA<br />
JDK 1.7<br />
Tomcat 7.0.22<br />
<br />
According to my guess the code might be creating a synchronization exception is:<br />
<br />
@Autowired<br />
FilterService fl;<br />
<br />
public List&lt;Node&gt; listNodesJSON(@Context ServletContext servletContext){<br />
<br />
return fl.listNodesJSON(servletContext);<br />
}<br />
public List&lt;Node&gt; listNodesXML(@Context ServletContext servletContext){<br />
<br />
return fl.listNodesJSON(servletContext);<br />
} <br />
<br />
Here FilterService is an interface which is implemented by my service class.<br />
<br />
The xml configuration(application context.xml) is as follows<br />
<br />
&lt;context:annotation-config /&gt;<br />
&lt;context:component-scan base-package=&quot;com.filter&quot; /&gt;<br />
&lt;tx:annotation-driven transaction-manager=&quot;transactionManager&quot; /&gt;<br />
&lt;bean class=&quot;org.springframework.dao.annotation.Persiste  nceExceptionTranslationPostProcessor&quot;/&gt;<br />
<br />
&lt;bean id=&quot;masterDAO&quot; class=&quot;com.filter.dao.jpa.MasterJpaDao&quot;&gt;<br />
&lt;/bean&gt;<br />
&lt;bean id=&quot;filterService&quot; class=&quot;com.rest.filter.impl.FilterServiceImpl&quot;&gt;<br />
&lt;/bean&gt;<br />
<br />
&lt;bean id=&quot;dataSource&quot; class=&quot;com.mchange.v2.c3p0.ComboPooledDataSource&quot;<br />
destroy-method=&quot;close&quot; p:driverClass=&quot;${jdbc.driverClassName}&quot;<br />
p:jdbcUrl=&quot;${debug.prefix:}${jdbc.url}&quot; p:user=&quot;${jdbc.username}&quot;<br />
p<img border="0" class="inlineimg" title="Razz" alt="" src="http://forum.springsource.org/images/smilies/tongue.png" />assword=&quot;${jdbc.password}&quot; p:initialPoolSize=&quot;10&quot; p:maxPoolSize=&quot;30&quot;<br />
p:acquireRetryAttempts=&quot;5&quot; p:acquireRetryDelay=&quot;3000&quot;<br />
p:idleConnectionTestPeriod=&quot;300&quot;&gt;<br />
&lt;/bean&gt;<br />
<br />
&lt;bean id=&quot;transactionManager&quot; class=&quot;org.springframework.orm.jpa.JpaTransactionM  anager&quot;<br />
p:entityManagerFactory-ref=&quot;entityManagerFactory&quot; /&gt;<br />
<br />
&lt;bean id=&quot;entityManagerFactory&quot;<br />
class=&quot;org.springframework.orm.jpa.LocalContainerE  ntityManagerFactoryBean&quot;<br />
p:dataSource-ref=&quot;dataSource&quot;&gt;<br />
&lt;property name=&quot;loadTimeWeaver&quot;&gt;<br />
&lt;bean class=&quot;org.springframework.instrument.classloading  .InstrumentationLoadTimeWeaver&quot; /&gt;<br />
&lt;/property&gt;<br />
&lt;property name=&quot;persistenceUnitName&quot;  value=&quot;filterservicePU&quot; /&gt;<br />
<br />
This bean &lt;bean id=&quot;masterDAO&quot;  class=&quot;com.filter.dao.jpa.MasterJpaDao&quot;&gt; is for implementing the  database methods which will <br />
make a database query to get the data.<br />
<br />
&lt;bean id=&quot;filterService&quot;  class=&quot;com.rest.filter.impl.FilterServiceImpl&quot;&gt; this bean is used for  making the view of the fetched data.<br />
If any details are required i am ready to post them.<br />
Please help me in solving this issue . Thanks in advance.</p>
