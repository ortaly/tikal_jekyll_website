---
layout: post
title: Spring bean overriding between projects
created: 1369163939
author: chaim.turkel
permalink: spring-bean-overriding-between-projects
tags:
- JAVA
- Spring
- bean override
---
<br />
<h1>
	Spring bean overriding between projects<o:p></o:p></h1>
<div class="MsoNormal">
	Our application is split into two layers. There is the core layer (a layer that is common between multiple projects) and there is the customer/customization layer (layer that is customized per customer). What is needed is to enable the customer layer to override the core dao repository. This means that if in the core there is a dao:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Repository</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> UserHibernateDao </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">extends</span></b><span style="font-family: Consolas; font-size: 10pt;"> GenericHibernateDao&lt;User&gt; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">implements</span></b><span style="font-family: Consolas; font-size: 10pt;"> UserDao {<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp; public User getUser(){<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return findUniqueByNamedQuery(</span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;User.findUserById&quot;</span><span style="font-family: Consolas; font-size: 10pt;">,id);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	}<o:p></o:p></div>
<div class="MsoNormal">
	The customer layer wants to change the getUser method in the core application layer to:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Repository</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> UserHibernateDaoEx </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">extends</span></b><span style="font-family: Consolas; font-size: 10pt;"> UserHibernateDao&lt;User&gt; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">implements</span></b><span style="font-family: Consolas; font-size: 10pt;"> UserDao {<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp; @Override<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp; public User getUser(){<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return findUniqueByNamedQuery(</span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;User.findUserExById&quot;</span><span style="font-family: Consolas; font-size: 10pt;">,id);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	}<o:p></o:p></div>
<div class="MsoNormal">
	The question is how to override the functionality in spring so that the customer layer bean will be injected into the core classes.<o:p></o:p></div>
<div class="MsoNormal">
	The core classes can use one of the following annotations to inject to UserDao to its classed:<o:p></o:p></div>
<div class="MsoNormal">
	@Autowire, @Resource, @Inject<o:p></o:p></div>
<div class="MsoNormal">
	A summary of the differences between them is as follows (<a href="http://blogs.sourceallies.com/2011/08/spring-injection-with-resource-and-autowired/">http://blogs.sourceallies.com/2011/08/spring-injection-with-resource-and-autowired/</a>):<o:p></o:p></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in;">
	<b><span style="border: none windowtext 1.0pt; color: #2e2e2e; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-border-alt: none windowtext 0in; mso-fareast-font-family: &quot;Times New Roman&quot;; padding: 0in;">@Autowired and @Inject</span></b><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;"><o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l0 level1 lfo1; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">1.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Matches by Type<o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l0 level1 lfo1; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">2.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Restricts by Qualifiers<o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l0 level1 lfo1; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">3.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Matches by Name<o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in;">
	&nbsp;</div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in;">
	<b><span style="border: none windowtext 1.0pt; color: #2e2e2e; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-border-alt: none windowtext 0in; mso-fareast-font-family: &quot;Times New Roman&quot;; padding: 0in;">@Resource</span></b><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;"><o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l1 level1 lfo2; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">1.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Matches by Name<o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l1 level1 lfo2; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">2.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Matches by Type<o:p></o:p></span></div>
<div class="MsoNormal" style="background: white; line-height: 15.0pt; margin-bottom: .0001pt; margin-bottom: 0in; margin-left: 9.0pt; margin-right: 0in; margin-top: 0in; mso-list: l1 level1 lfo2; tab-stops: list .5in; text-indent: -.25in;">
	<!--[if !supportLists]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: Arial;">3.<span style="font-family: 'Times New Roman'; font-size: 7pt; line-height: normal;">&nbsp;&nbsp;&nbsp;&nbsp; </span></span><!--[endif]--><span style="color: #4d4d4d; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; font-size: 10.0pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Restricts by Qualifiers (ignored if match is found by name)<o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	The problem is as follows. Client code is as follows:<o:p></o:p></div>
<div class="MsoNormal">
	<span style="font-family: Consolas; font-size: 10pt; line-height: 107%;">@Resource<o:p></o:p></span></div>
<div class="MsoNormal">
	<span style="font-family: Consolas; font-size: 10pt; line-height: 107%;">Private UserDao useDao;</span><o:p></o:p></div>
<div class="MsoNormal">
	The spring component uses the <span style="color: #646464; font-family: Consolas; font-size: 10.0pt; line-height: 107%;">@</span>Repository annotation for the definition. This annotation is used without a name, so the default name is for the core: userHibernateDao and for the customer: userHibernateDaoEx. When spring tries to inject into userDao using the @Resource, it does not find any component by the name of userDao. Spring then searches by type of UserDao, and finds two implementations and cannot inject the component. By giving the same name to both components spring will complain that there are two components with the same id.<o:p></o:p></div>
<div class="MsoNormal">
	The solution is to use an undocumented feature of spring. You cannot define two components with the same id in the same xml file. But if you can define two beans with the same id in two different xml files, the second bean (depends on the order of the files) will be the one that spring uses.<o:p></o:p></div>
<div class="MsoNormal">
	So in the customer layer, instead of using the @Repository annotation on the inherited dao, it needs to be defined in an xml file.<o:p></o:p></div>
<div class="MsoNormal">
	Summary:<o:p></o:p></div>
<div class="MsoNormal">
	We have found a way for the customer layer to inherit and override a spring bean that has been defined in the core layer in such a way that the new bean definied in the customer layer will be used by the core layer itself and the overridden functionality from the customer layer.<o:p></o:p></div>
<div class="MsoNormal">
	For more information see: <a href="http://beradrian.wordpress.com/2011/05/08/overriding-spring-beans/">http://beradrian.wordpress.com/2011/05/08/overriding-spring-beans/</a><o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
