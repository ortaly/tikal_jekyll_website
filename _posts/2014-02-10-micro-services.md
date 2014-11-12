---
layout: post
title: Micro Services
created: 1392024249
author: chaim.turkel
permalink: /java/micro-services
tags:
- JAVA
- micro services
- Spring Integration
- Akka
---
<h1>Micro Services</h1>

<p>I was at a session for micro services. There were many sessions covering different aspects of micro services (for seeing of the sessions, have a look at: <a href="http://www.meetup.com/full-stack-developer-il/events/155911442">http://www.meetup.com/full-stack-developer-il/events/155911442</a>). I would like to summarize some of the issues raised and to give my two cents on the topic.</p>

<p>There are many advantages and disadvantages with micro services and there is no silver bullet for all scenarios. &nbsp;Micro services are a reaction to the big monolithic applications. The biggest disadvantages of monolithic application are the following:</p>

<ol>
	<li><b>Library bloat</b>: with time as the code base grows, the libraries gets very big and conflicts between shared libraries get harder to handle.</li>
	<li><b style="line-height: 1.6em;">Memory/CPU</b><span style="line-height: 1.6em;">: a single application uses a lot of memory and cpu and there is no simple way to expand horizontally (except to duplicate the application across machine, and maybe disable portions by configuration files).</span></li>
	<li><span style="line-height: 1.6em;"><b>Initialization time</b>: the initialization time of the application goes up with each added feature to the application.</span></li>
	<li><span style="line-height: 1.6em;"><b>Deploy Time</b>: the time to deploy goes up with the size of the application.</span></li>
	<li><span style="line-height: 1.6em;"><b>Testing</b>: testing become more difficult with big application since it is hard to test only one area without building the whole application memory, and sometimes databases.</span>​​</li>
</ol>

<p>&nbsp;</p>

<h2><span style="line-height: 1.2em;">Solution overview</span></h2>

<p>Of course for each issue there are other solutions than micro services, but in this blog we will focus on the micro services solution. What is the solution of micro services &ndash; very simple. We distribute the main application across multiple processes and machines (hence the name micro service). The client application communicates with the main application (thought there are expansions to micro services were the client will also communicate with multiple servers). The main application will notify to all the micro services of the request and will then return mandatory results to the client. The base framework is an async framework so the main application is not busy with all the logic. The main app only handles the information that is mandatory to return to the client and all other functionality is delegated to services.</p>

<p>&nbsp;</p>

<h2>Architecture view</h2>

<p>The solution for most of these problems, and micro servers as a solution, are on two levels. One is the architectural solution, and the other is on a technical level.</p>

<p>As we mentioned above the communication between services is asynchronous. The standard way to implement this is with a messaging framework (for example: JMS, rabbitmq, <a href="http://activemq.apache.org/"><span style="color: windowtext; text-decoration: none; text-underline: none;">ActiveMQ</span></a>&nbsp;, <a href="http://openjms.sourceforge.net/"><span style="color: windowtext; text-decoration: none; text-underline: none;">OpenJMS</span></a>, <a href="https://kafka.apache.org/"><span style="color: windowtext; text-decoration: none; text-underline: none;">Kafka</span></a>&nbsp; and more). The design here is that the main application does not even need to know what the services are. Each new functionality that we want to add we can add as a service, and plug it in to the server by registering for events. This is very convenient for application that want to add more processing for information coming in but is not part of the main flow of the application. For instance a purchase on a ecommerce app will enter the request and display to the user the request. Then multiple services will process the information, including checking the inventory and updating if new quantities need to be added. Information about the person purchasing can be added and a lookup for credit history can be done. A full flow of data gathering and processing can be done via different services, and can be added with each. In this example the database is the center of the project, but in other scenarios the data can be pin ponged between services.</p>

<p>Of course if a service needs information from another service in a synchronous way, each service can also have an external API of rest or some other protocol.&nbsp;&nbsp;</p>

<p>See <a href="https://speakerdeck.com/kensodev/scaling-extending-and-expanding-your-apps-through-messaging">https://speakerdeck.com/kensodev/scaling-extending-and-expanding-your-apps-through-messaging</a> for a full presentation.</p>

<h2>Physical View</h2>

<p>The obvious gain from this architecture is that each service can run on any machine in the cloud. As to the issues raised above each service is a separate application so the library is local to each service and will not be big. Each service has its own resources so we will not be blocked by cpu consumption or memory. Deployment is easier since it is on the service level and not the whole application. Also testing is easier since the testing is per service and not on the whole application.</p>

<p>One of the biggest advantage that are pushed with the micro services is the option to totally rewrite a service if the requirements have changed since each service is fairly small, and if a functionality need to be remove the service can just be discarded.</p>

<p>Another big advantage is the language barrier. With micro services you can write each service in any language and with any team. Since all interfaces to the app are via message queue or rest, and language can be used.</p>

<p>&nbsp;</p>

<h2>Draw backs</h2>

<p>But as we know there is no free lunch. What are the major issues that need to be addressed with micro services?</p>

<ul>
	<li><b>Integration</b>: Since there is no app, it is hard to determine ahead of time how the application as a whole will run. The information passed via the message queue might need to change over time, and we do not know which services are using which messages, and which ones need to be updated.</li>
	<li><b>Latency</b>: Once logic is distributed across multiple machines there is the latency issue. So only application that the latency is not a big issue can use this architecture.</li>
	<li><b>Configuration</b>: How are the configurations of each service handled? Do we have a central repository for configurations? There can be hundreds of machines that need to be configured, and each service with a different format (see <a href="https://speakerdeck.com/hagzag/docking-your-services-with-docker">https://speakerdeck.com/hagzag/docking-your-services-with-docker</a> for some solutions).</li>
	<li><b>Transactions</b>: Once we are in an asynchronous framework that crosses machines we lose the option to have all functionality in one transaction. All &ldquo;commit/rollback&rdquo; needs to be done on the application level and not database level.</li>
	<li><b>Debugging</b>: How do we debug the application as a whole when each service is on a different machine, in a different language using different logs types.</li>
	<li><b>Monitoring</b>: How do we monitor all the applications to make sure they are giving the performance we expect.</li>
</ul>

<p class="rteindent1">For the last two issues see <a href="http://zohararad.github.io/presentations/micro-services-monitoring/index.html">http://zohararad.github.io/presentations/micro-services-monitoring/index.html</a>, solutions for them can be flume, logstash, kibana , sensu.</p>

<ul>
	<li><b>Retransmissions</b>: How do we handle issues where the service fails, we need to make sure that the messaging framework supports transaction of deleting the message only after the service finished with it.</li>
</ul>

<h2>Other solutions?</h2>

<p>Are micro services the only solution? As we mentioned above there is no silver bullet. The architecture behind the micro service is an old one of messaging.</p>

<h3>OSGI</h3>

<p>One architecture that has been around, that also address some of the issues raised above is OSGI (<a href="http://en.wikipedia.org/wiki/OSGi">http://en.wikipedia.org/wiki/OSGi</a>). &nbsp;OSGI focus is to solve library and deployment issues. The basic idea is to generate bundles, where each bundle is a single unit in itself.</p>

<p>The concept was good, but there was never a good implementation of it, and the industry never took it up, since it usually caused more trouble than was worth.</p>

<h3>Messaging</h3>

<p>The idea of messaging is not new. Using message for transferring data between objects was part of the smalltalk language already in the 80&rsquo;s (<a href="http://en.wikipedia.org/wiki/Smalltalk">http://en.wikipedia.org/wiki/Smalltalk</a>).</p>

<p>Windows OS used the idea of messaging for handling events from the user in a GUI application (<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage">https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage</a>).</p>

<p>Android OS uses Intents to transfer information between windows and applications. Intents are actually simple messages that are broadcasted and receivers can listen to these intents (<a href="http://developer.android.com/reference/android/content/Intent.html">http://developer.android.com/reference/android/content/Intent.html</a>).</p>

<p>The basic idea behind messaging is that the data is passed between participants is immutable. This way even with multi-threading there is no memory sharing between with processes that need critical sections.</p>

<h3>Spring Integration / Camel</h3>

<p>If you do not want to split your application to multiple services and computer, but you do want to gain the architecture of the micro services, you can use enterprise integration patterns. The basic pattern in every enterprise application is that data needs to pass between processes and needs to be transformed from one presentation to another. In the past we had xslt for xmls, but in object framework we still need to transfer and translate object.</p>

<p>The basic architecture of these frameworks (<a href="http://docs.spring.io/spring-integration/reference/html/overview.html">http://docs.spring.io/spring-integration/reference/html/overview.html</a>, <a href="http://camel.apache.org/enterprise-integration-patterns.html">http://camel.apache.org/enterprise-integration-patterns.html</a>) allows each feature to be written in isolation and without any knowledge of the other. The flow between the data is defined in a xml configuration file. The actual process of the messages is the same as queuing where via the xml file you wire the flow of the data, where you can not only pass the data but also transform it for the needs of each feature.</p>

<h3><strong>Advantages over micro services</strong></h3>

<ul>
	<li>You have the flexibility and modularity of micro services without all the maintenance of multiple services and machines.</li>
	<li>Flow of application can be viewed in xml (and visualized in ide).</li>
	<li>Spring Integration/Camel support transaction barriers across beans (features).</li>
	<li>All logging and error handling are handles in one place.</li>
	<li>Testing can be done on both the feature level and the flow level.</li>
</ul>

<h3><strong>Disadvantages</strong></h3>

<ul>
	<li>In the case of java, you can only write the code in languages that run on the JVM.​</li>
	<li>There is still an issue of library bloat.</li>
	<li>Memory / CPU are still issues since you have only one application.</li>
</ul>

<h2>Summary:</h2>

<p>Using modular frameworks in a monolithic application give you the architecture advantage of micro services but without the flexibility of horizontal expansion via multiple machines and processes.</p>

<p>See features of spring 4 that help us with micro services: <a href="https://spring.io/blog/2013/12/12/announcing-spring-framework-4-0-ga-release">https://spring.io/blog/2013/12/12/announcing-spring-framework-4-0-ga-release</a>.</p>

<h2>Akka</h2>

<p>Another framework that is between spring integration and micro services is akka (<a href="http://akka.io/">http://akka.io</a>).</p>

<p>In a very simplistic overview, akka is an actor model system (<a href="http://en.wikipedia.org/wiki/Actor_model">http://en.wikipedia.org/wiki/Actor_model</a>). Akka is written in Scala that is a functional language that brings a functional programing view. Again in a simplistic view Akka is similar to messaging frameworks in that all information that is passed between objects is done by messaging. There are a lot of similarities between akka and spring integration and there are big differences. Since they are different systems they can even be used together.</p>

<p>One big feature in akka that does not exist in spring integration, from the micro service view, is the distribution model. One of the goals of Akka is &ldquo;location transparency&rdquo; (<a href="http://doc.akka.io/docs/akka/2.2.3/intro/what-is-akka.html">http://doc.akka.io/docs/akka/2.2.3/intro/what-is-akka.html</a>). This is one of the big draw backs of spring integration in the micro service perspective. Akka out of the box supports the option to install the system on multiple machines without any code change. So by using akka we can still write in a micro service architecture and gain a lot of the build in features of akka that include transactions (<a href="http://doc.akka.io/docs/akka/2.0.1/scala/transactors.html">http://doc.akka.io/docs/akka/2.0.1/scala/transactors.html</a>) and the option for horizontal expansion.</p>

<p>The main disadvantage of Akka is that you still have the library bloating as your application grows, and the application is still written as a monolithic application and not a diverse application.</p>

<p>For more information on functional programing and micro services see:</p>

<p><a href="http://www.slideshare.net/michaelneale/microservices-and-functional-programming">http://www.slideshare.net/michaelneale/microservices-and-functional-programming</a></p>
