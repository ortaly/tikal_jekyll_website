---
layout: post
title: Nested Hibernate Filters
created: 1375103855
author: chaim.turkel
permalink: /nested-hibernate-filters
tags:
- JAVA
- Hibernate
- filters
- Stack
---
<h1>
	Nested Hibernate Filters<o:p></o:p></h1>
<div class="MsoNormal">
	Hibernate added a feature that is not part of the JPA, and this is filters. <o:p></o:p></div>
<div class="MsoNormal">
	When you want to load information from the database but want to filter the data, you can use HQL, @Where or filters.<o:p></o:p></div>
<div class="MsoNormal">
	HQL is good if your filter is limited to the query that you need. If you always want to filter the class you can add to the class the @Where. In the cases that you sometimes want to filter and sometimes not, or you need to parameterize the filtering then you use the @Filters.<o:p></o:p></div>
<div class="MsoNormal">
	It feels like all the features of filtering were an afterthought by hibernate. The reason is that hibernate does not use the field names for the filtering or @Where but uses the database field name. The reason they do this, is that it is easy to add to the sql statement the where statement, and they do not have to parse the class objects.<o:p></o:p></div>
<div class="MsoNormal">
	For more information on filters see: <a href="http://docs.jboss.org/hibernate/orm/3.6/reference/en-US/html/filters.html">http://docs.jboss.org/hibernate/orm/3.6/reference/en-US/html/filters.html</a>, <a href="http://java.dzone.com/articles/introduction-hibernate-filters">http://java.dzone.com/articles/introduction-hibernate-filters</a>.<o:p></o:p></div>
<div class="MsoNormal">
	Another oversight on the filter issue is nested filters. Hibernate does not care how many times you enable the filter, one disable will disable it in any case. Also if you change the parameter of a filter that is already open hibernate has no problem and will update the fiter.<o:p></o:p></div>
<h2>
	Take the following case:<o:p></o:p></h2>
<div class="MsoNormal">
	Enable filter, date: 1/1/2000<o:p></o:p></div>
<div class="MsoNormal" style="text-indent: .5in;">
	Load data<o:p></o:p></div>
<div class="MsoNormal" style="text-indent: .5in;">
	Enable filter, date: 1/1/1999<o:p></o:p></div>
<div class="MsoNormal" style="margin-left: .5in; text-indent: .5in;">
	Load data<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Disable filter<o:p></o:p></div>
<div class="MsoNormal" style="text-indent: .5in;">
	Load data<o:p></o:p></div>
<div class="MsoNormal">
	Disable filter<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	In this scenario we have two problems. Once the disable filter is called there is no open filter so the third load data will run with no filter at all. Even if the filter was not closed we would still have the problem that the date of the filter is incorrect, since it is set for 1999 and not 2000.<o:p></o:p></div>
<div class="MsoNormal">
	To solve this issue we need to implement a stack of filters per filter name and store them on the local thread (so that our genericdao is thread safe).<o:p></o:p></div>
<h2>
	<span style="background: silver; mso-highlight: silver;">FilterInfo</span> Class<o:p></o:p></h2>
<div class="MsoNormal">
	The first class will hold the parameters of the filter and what is the nested count (how many times has the enable been called for the same filter with the same parameters):<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: silver; mso-highlight: silver;">FilterInfo</span> {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> Map&lt;String, Object&gt; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;"> = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> HashMap&lt;String, Object&gt;();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo(Map&lt;String, Object&gt; parameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">super</span></b><span style="font-family: Consolas; font-size: 10pt;">();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">this</span></b><span style="font-family: Consolas; font-size: 10pt;">.</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;"> = parameters;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;"> areParametersTheSame(Map&lt;String, Object&gt; currentParameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;">.size() &gt; 0) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #3f7f5f; font-family: Consolas; font-size: 10.0pt;">// check old parameters, see if changed</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">for</span></b><span style="font-family: Consolas; font-size: 10pt;"> (String paramName : </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;">.keySet()) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">for</span></b><span style="font-family: Consolas; font-size: 10pt;"> (String currentparamName : currentParameters.keySet()) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (paramName.equals(currentparamName)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Object newValue = </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;">.get(paramName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Object oldValue = currentParameters.get(paramName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (!newValue.equals(oldValue)) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> decNestedCount() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">--;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> incNestedCount() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">++;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> Map&lt;String, Object&gt; getParameters() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">parameters</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> getNestedCount() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">nestedCount</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<h2>
	<span style="background: silver; mso-highlight: silver;">FilterStack</span> Class<o:p></o:p></h2>
<div class="MsoNormal">
	This class will store a stack of the parameters per filter so that we can re enable the filter with the correct parameters once a nested filter is disabled.<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: silver; mso-highlight: silver;">FilterStack</span> {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterName</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> Stack&lt;FilterInfo&gt; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;"> = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> Stack&lt;FilterInfo&gt;();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterStack(String filterName) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">this</span></b><span style="font-family: Consolas; font-size: 10pt;">.</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterName</span><span style="font-family: Consolas; font-size: 10pt;"> = filterName;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo setParameters(Map&lt;String, Object&gt; parameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">boolean</span></b><span style="font-family: Consolas; font-size: 10pt;"> areParametersTheSame = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">false</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterInfo filterInfo = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.size() &gt; 0) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; filterInfo = </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.peek();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; areParametersTheSame = filterInfo.areParametersTheSame(parameters);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (!areParametersTheSame) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #3f7f5f; font-family: Consolas; font-size: 10.0pt;">// add a new stack</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; filterInfo = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo(parameters);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.push(filterInfo);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; filterInfo.incNestedCount();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> filterInfo;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo disableFilter() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.size()==0) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">throw</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> InfraException(</span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;you are closing a filter that is not open: &quot;</span><span style="font-family: Consolas; font-size: 10pt;"> + </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterName</span><span style="font-family: Consolas; font-size: 10pt;">);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterInfo peek = </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.peek();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (peek != </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> decNestedCount = peek.decNestedCount();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (decNestedCount &lt;= 0) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.pop();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.size()&gt;0 ?&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filterStack</span><span style="font-family: Consolas; font-size: 10pt;">.peek() : </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> peek;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<h2>
	<span style="background: silver; mso-highlight: silver;">NestedFilterInfo</span> Class<o:p></o:p></h2>
<div class="MsoNormal">
	The last class will be stored on the local thread, and will hold all the information for all the open filters.<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: silver; mso-highlight: silver;">NestedFilterInfo</span> {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> Map&lt;String, FilterStack&gt; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;"> = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> HashMap&lt;String, FilterStack&gt;();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo enableFilter(String filterName, Map&lt;String, Object&gt; parameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #3f7f5f; font-family: Consolas; font-size: 10.0pt;">// get current filter information</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterStack filterStack = </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;">.get(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (filterStack == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; filterStack = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterStack(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;">.put(filterName, filterStack);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #3f7f5f; font-family: Consolas; font-size: 10.0pt;">// check if filter parameters have changed.</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> filterStack.setParameters(parameters);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> FilterInfo disableFilter(String filterName) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterStack filterStack = </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;">.get(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> filterStack.disableFilter();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> Set&lt;String&gt; getFilterNames() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;">.keySet();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> clear() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">filtersByName</span><span style="font-family: Consolas; font-size: 10pt;">.clear();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<h2>
	GenericDao class<o:p></o:p></h2>
<div class="MsoNormal">
	In the generic dao class that actually opens and closes the filter will use these classes to manage all open filters. The function to enable a filter will call:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: silver; mso-highlight: silver;">enableFilter</span>(String filterName, Map&lt;String, Object&gt; mapParameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<span style="font-family: Consolas; font-size: 10pt;">NestedFilterInfo filterStack = getFilterStack();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterInfo enableFilter = filterStack.enableFilter(filterName, mapParameters);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sessionEnableFilter(filterName, enableFilter.getParameters());</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> <span style="background: silver; mso-highlight: silver;">sessionEnableFilter</span>(String filterName, Map&lt;String, Object&gt; mapParameters) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Filter filter = session().enableFilter(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Object value;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (mapParameters != </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;">) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">for</span></b><span style="font-family: Consolas; font-size: 10pt;"> (Map.Entry&lt;String, Object&gt; entryParameters : mapParameters.entrySet()) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; value = entryParameters.getValue();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; filter.setParameter(entryParameters.getKey(), value);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal">
	The enabling filter is the easy part. For every enable filter if no parameters have changed we will increment the counter on the FilterInfo class. If the parameters have changed we will create a new FIlterInfo and add it to the stack in the FilterStack.<o:p></o:p></div>
<div class="MsoNormal">
	The magic is done in the disable filter:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> disableFilter(String filterName) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NestedFilterInfo filterStack = getFilterStack();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FilterInfo filterInfo = filterStack.disableFilter(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">if</span></b><span style="font-family: Consolas; font-size: 10pt;"> (filterInfo == </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">null</span></b><span style="font-family: Consolas; font-size: 10pt;"> || filterInfo.getNestedCount() &lt;= 0) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; session().disableFilter(filterName);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">else</span></b><span style="font-family: Consolas; font-size: 10pt;"> {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sessionEnableFilter(filterName, filterInfo.getParameters());</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	Here we call the disable and get a FilterInfo class. If the nested count is down to zero then we have finished the stack and called the disable the same amount as the enable so we will close the filter on the session. If not then either the stack count went down by one, or we got the previous filter that was open. In either case we update the session filter with the parameters, and this way we have reverted the filter to the previous one.<o:p></o:p></div>
<div class="MsoNormal">
	This solution support both nested filters with the same parameters (only after the last disable with the filter really be closed) and nested filters with different parameters (with the new parameters the session will be updated, and on the disable filter the previous parameters will be returned to the session).<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal" style="margin-left: .5in; text-indent: .5in;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-left: .5in; text-indent: .5in;">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal" style="text-indent: .5in;">
	&nbsp;</div>
<br />
<div class="MsoNormal" style="text-indent: .5in;">
	&nbsp;</div>
