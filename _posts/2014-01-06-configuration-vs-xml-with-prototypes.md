---
layout: post
title: '@Configuration vs xml with prototypes'
created: 1389001500
author: chaim.turkel
permalink: configuration-vs-xml-with-prototypes
tags:
- JAVA
- Java
- Spring
- prototype
- configuation
---
<h1>@Configuration vs xml with prototypes<o:p></o:p></h1>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">There are two sides to using spring. One is the injection side, and the annotations are &nbsp;@Autowire, @Inject, @Resource (see <a href="http://javaandroidandrest.blogspot.co.il/2013/05/spring-bean-overriding-between-projects.html">http://javaandroidandrest.blogspot.co.il/2013/05/spring-bean-overriding-between-projects.html</a>). The other side is the definition of beans: @Component, @Repository, @Server.<o:p></o:p></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">The beginning of spring all injections were done via xml configuration files. With each version spring added more and more annotations so simplify matters. &nbsp;When it came to injection annotations were usually used and xml files were used only when the annotation was not enough (like using maps).<o:p></o:p></div>

<div class="MsoNormal">For configuration files xml were the main default especially when complex configurations were including. One of the more complicated configurations is the prototype.<o:p></o:p></div>

<h2>Prototypes<o:p></o:p></h2>

<div class="MsoNormal">Before we go into the @Configuration, I would like to add a word on prototypes. In spring there are two scopes one is singleton and the other prototype. Singleton means that only one instance of that bean will exist in the spring context. While prototype means that multiple beans can exist. If you have a multiple singletons (from different types) that reference a prototype bean, each singleton will get its own instance of the prototype. <o:p></o:p></div>

<div class="MsoNormal">For example:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Component</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Scope</span><span style="font-family: Consolas; font-size: 10pt;">(</span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;prototype&quot;</span><span style="font-family: Consolas; font-size: 10pt;">)</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> Chair {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Component</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> Garage {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@<span style="background: silver; mso-highlight: silver;">Autowired</span></span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chair </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">chair</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Component</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> House {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@<span style="background: silver; mso-highlight: silver;">Autowired</span></span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chair </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">chair</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}<o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal">Anyone that references the house of the garage will get the same instance as everyone else. &nbsp;Though in the case of the chair both the garage and the house, will each have a separate instance of the chair.<o:p></o:p></div>

<div class="MsoNormal">Now when you need to generate during a runtime of the application another instance of the prototype then you need a lookup method.<o:p></o:p></div>

<div class="MsoNormal">For example let&rsquo;s say that during runtime I need to create a new chair, so on my house class I will have a method of: protected Chair createChair(); <o:p></o:p></div>

<div class="MsoNormal">We cannot create the chair with new Chair(), since then spring will not generate the class, and any injections within the chair class will not happen. So the spring solution to this is to create a lookup method. In the xml you write:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">bean</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">id</span>=<i><span style="color: #2a00ff;">&quot;house&quot;</span></i> <span style="color: #7f007f;">class</span>=<i><span style="color: #2a00ff;">&quot;com.domain.House&quot;</span></i><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10.0pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: teal;">&lt;</span><span style="color: #3f7f7f;">lookup-method</span> <span style="color: #7f007f;">name</span>=<i><span style="color: #2a00ff;">&quot;createChair&quot;</span></i> <span style="color: #7f007f;">bean</span>=<i><span style="color: #2a00ff;">&quot;com.domain.Chair&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>

<div class="MsoNormal"><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">bean</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&gt;<o:p></o:p></span></div>

<div class="MsoNormal">And in the class you need to add the abstract method<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Component</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">abstract</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> House {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Autowired</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chair </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">chair</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">abstract</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">protected</span></b><span style="font-family: Consolas; font-size: 10pt;"> Chair createChair();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">Spring will then implement this method and any time you call the createChair() a spring instance of the Chair will all injections will be created.<o:p></o:p></div>

<div class="MsoNormal">For more information you can see the article: <a href="http://nurkiewicz.blogspot.co.il/2010/08/creating-prototype-spring-beans-on.html">http://nurkiewicz.blogspot.co.il/2010/08/creating-prototype-spring-beans-on.html</a><o:p></o:p></div>

<h2>@ Configuration<o:p></o:p></h2>

<div class="MsoNormal">With spring 3, spring add the @Configuration annotation. What this annotation allows you to do is to actually write all your xml in java code. <o:p></o:p></div>

<div class="MsoNormal">So for creating a bean of House we can either add @Component on the house class, we can add to the xml:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: teal; font-family: Consolas; font-size: 10.0pt;">&lt;</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt;">bean</span><span style="font-family: Consolas; font-size: 10.0pt;"> <span style="color: #7f007f;">id</span>=<i><span style="color: #2a00ff;">&quot;house&quot;</span></i> <span style="color: #7f007f;">class</span>=<i><span style="color: #2a00ff;">&quot;com.domain.House&quot;</span></i><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10.0pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <o:p></o:p></span></div>

<div class="MsoNormal"><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&lt;/</span><span style="color: #3f7f7f; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">bean</span><span style="color: teal; font-family: Consolas; font-size: 10.0pt; line-height: 115%;">&gt;<o:p></o:p></span></div>

<div class="MsoNormal">Or we can create a class with the annotation of @Configuration to create the bean:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@<span style="background: silver; mso-highlight: silver;">Configuration</span></span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> ClassFactory {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Bean</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> House createHouse(){</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> House();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">So for those people that prefer to write java code over xml files, you can now use configuration classes. <o:p></o:p></div>

<div class="MsoNormal">You client code still stays the same and you just inject the House using @Autowired.<o:p></o:p></div>

<div class="MsoNormal">Of course since the house is a singleton the method of &ldquo;createHouse&rdquo; will be called by spring only once and all places that inject the house will get this instance. In the case of prototypes you will add the method of:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Bean</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Scope</span><span style="font-family: Consolas; font-size: 10pt;">(</span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;prototype&quot;</span><span style="font-family: Consolas; font-size: 10pt;">)</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> Chair createChair(){</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> Chair();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">Now anytime that you inject a chair to a bean a new instance of the chair will be instantiated. <o:p></o:p></div>

<div class="MsoNormal">The configuration class allows you to set any properties that you want on the bean and write any code that you need. The spring framework will do its magic once the runtime finishes the method with the @Bean annotation. For example the method of &ldquo;<a href="http://docs.spring.io/spring/docs/2.5.6/api/org/springframework/beans/factory/InitializingBean.html#afterPropertiesSet()"><span style="color: windowtext; text-decoration: none; text-underline: none;">afterPropertiesSet</span></a>&rdquo; will be called once the @Bean method finishes.<o:p></o:p></div>

<div class="MsoNormal">A added advantage to the configuration bean is now you have a built in lookup method for creating prototype beans. Any class that has the @Configuration annotation is also a spring bean, so you can now inject this bean in your class and call the &ldquo;createChair&rdquo;. So you can now write in your house class:<o:p></o:p></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Component</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> House {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Autowired</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chair </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">chair</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Autowired</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ClassFactory </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">factory</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> Chair createChair(){</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">factory</span><span style="font-family: Consolas; font-size: 10pt;">.createChair();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>

<div class="MsoNormal">&nbsp;</div>

<p>&nbsp;</p>
