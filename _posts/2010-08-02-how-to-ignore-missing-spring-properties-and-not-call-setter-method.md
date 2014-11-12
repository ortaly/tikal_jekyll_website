---
layout: post
title: How to ignore missing Spring  properties and not call setter method
created: 1280782333
author: shalom
permalink: /java/how-ignore-missing-spring-properties-and-not-call-setter-method
tags:
- JAVA
- Spring
---
<p>Anyone knows a way to make PropertyPlaceholderConfigurer ignore missing properties and not call the setter method at all?<br />
for example:</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;webAppContext&quot; class=&quot;org.eclipse.jetty.webapp.WebAppContext&quot; scope=&quot;prototype&quot;&gt;
&lt;property name=&quot;maxFormContentSize&quot; value=&quot;${maxFormContentSize}&quot;/&gt;
&lt;/bean&gt;</pre>
<p>I can use a default value for the placeholder, but in some cases I want to let jetty use whatever it defaults to, so I will not supply  the maxFormContentSize property and I would expect the container to not  call the setter method. but it does call the setter method with the  placeholder's literal value and ignoreUnresolvablePlaceholders does not help here.</p>
