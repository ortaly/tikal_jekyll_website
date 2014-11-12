---
layout: post
title: Re-Architecting Flex Cairngorm Application with Spring Actionscript
created: 1298559247
permalink: /js/re-architecting-flex-cairngorm-application-spring-actionscript
tags:
- JS
- flex spring actionscript dependency injection
---
<p class="MsoNormal"><b>Motivation</b></p>
<p class="MsoNormal">After working with a several enterprise application , I noticed that as the application grows (with many features into it) complexity increased.</p>
<p class="MsoNormal">Complexity is a major challenge for large applications, the more collaborations of objects , the more complexity.</p>
<p class="MsoNormal">In order to keep complexity under control we need to give our application more robust testing coverage and make sure our objects is separated and independent from each other.</p>
<p class="MsoNormal">The dependency injection approach helps us doing so.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><strong><span style="font-family: &quot;Calibri&quot;,&quot;sans-serif&quot;;">Dependency Injection in a Nutshell</span></strong></p>
<p class="MsoNormal">Dependency Injection basically describes separating configuration from implementation. Swapping in and out different object dependencies in different application contexts hasn&rsquo;t been implemented very cleanly in traditional Object Orientated languages.&nbsp; In light of this, frameworks like the <a target="_blank" href="http://www.springframework.org/">Spring Framework</a> have risen in popularity over the last few years.</p>
<p class="MsoNormal"><b>Spring Actionscript</b></p>
<p class="MsoNormal"><span style="">&nbsp;</span>Spring ActionScript is an offshoot of the Java-based Spring Framework written in ActionScript 3. It is targeted for the Flash, Flex and AIR platforms. The framework contains an Inversion of Control Container, an Operation and Task API, an EventBus, a metadata handling system, extensions for the Cairngorm and PureMVC frameworks and several other utilities.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b>Caingorm 2</b></p>
<p class="MsoNormal">Spring Actionscript offers several extensions to the Cairngorm 2 micro-architecture that will make it easier to configure the various objects by the Spring Actionscript <abbr class="abbrev">IoC</abbr> container. And some of them will just make life a little easier when working with Cairngorm. What follows is a description of how to setup a configuration file that will allow you to manage the Cairngorm framework externally.</p>
<p class="MsoNormal"><b>Injecting the MXML dependencies </b></p>
<p class="MsoNormal">The mxml components in the UI using mostly the Model ,</p>
<p class="MsoNormal">So we described our Model class in the application-context as follows:</p>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal"><span style="">&lt;object id=&quot;modelLocator&quot; class=&quot;com.adobe.cairngorm.samples.store.model.ShopModelLocator&quot; scope=&quot;singleton&quot; &gt;</span></p>
<p style="margin-bottom: 0.0001pt; line-height: normal;" class="MsoNormal"><span style=""><span style="">&nbsp;&nbsp;&nbsp; </span><span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>&lt;!&mdash;OMMITED CONFIGURATION --&gt;</span></p>
<p class="MsoNormal"><span style=""><span style="">&nbsp;&nbsp;&nbsp; </span>&lt;/object&gt;</span></p>
<p class="MsoNormal"><span style="">&nbsp;</span></p>
<p class="MsoNormal"><span style="">The cairngorm ModelLocator class uses the getInstance factory method here in our model we omitted it, and let the framework implement the singleton mechanism (scope=&rsquo;singleton&rsquo;) in that way we don&rsquo;t need to call always to ModelLocator.getInstance that is a sin in a world of loose coupling.</span></p>
<p class="MsoNormal"><span style="">Now we can inject the model to every mxml component using it with the [Autowired] metadata on the model variable.</span></p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b>Injecting Command dependencies</b></p>
<p class="MsoNormal">Instead declaring the Model and the Delegate as internal members of the command we let the Spring-AS framework to inject that properties and this how we can let tests injects its mock delegates for example.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b>Initialize the CairngormController with the framwork <span style="">&nbsp;</span></b></p>
<p class="MsoNormal">The cairngorm controller uses the addCommand(commanded, command) method in order to map between commands and events.</p>
<p class="MsoNormal">We took this definition to the application-context.xml and this give us the ability to change mappings without compiling the application again and give us more flexibility using tests.</p>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><b>Summary</b></p>
<p class="MsoNormal">The ability of declaring all Cairngorm foundation classes outside the application code give us loose coupling between the application code and the MVC framework, so if tomorrow we want to change our MVC framework we do not need to touch a line in our application code.</p>
<p><span style="font-size: 11pt; font-family: &quot;Calibri&quot;,&quot;sans-serif&quot;;">Furthermore our application is testable and less complex.</span></p>
<!--![endif]__comment__end__
<p--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if-->
