---
layout: post
title: Extend interface implementation (proxy/delegation pattern)
created: 1366717622
author: chaim.turkel
permalink: extend-interface-implementation-proxy-delegation-pattern
tags:
- JAVA
- Java
- proxy
- interface
- delegation
---
<br />
<div align="center" class="MsoNormal" style="text-align: center;">
	Extend interface implementation (proxy/delegation pattern)<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	Yes this is not a type mistake, I want to extend the implementation of an interface. How many times do we have access to an interface but not the implementation? In the case that we have the implementation we can usually inherit the class and override the public/protected functionality. But what do you do when there is a factory builder that returns an instantiated object with an interface and you do not know or what to know the implementation (since it can always change), and you still want to override some of the functionality.<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	Let&rsquo;s take a simple example. To write an xml file you can use the following code:<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
Object request;<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
JAXBContext jc = JAXBContext.newInstance(classesToBeBound);<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
Marshaller m = jc.createMarshaller();<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
XMLOutputFactory xmlOutputFactory = XMLOutputFactory.newInstance();<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
ByteArrayOutputStream ba = new ByteArrayOutputStream();<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
XMLStreamWriter writer = xmlOutputFactory.createXMLStreamWriter(ba);&nbsp; <o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
m.marshal(request, writer);<o:p></o:p></pre>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
<o:p>&nbsp;</o:p></pre>
<div class="MsoNormal" style="text-align: justify;">
	This code takes a buffer array and marshals it to an xml document using the XMLStreamWriter. <o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	The XMLStreamWriter is an interface: <o:p></o:p></div>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
public abstract interface javax.xml.stream.XMLStreamWriter<o:p></o:p></pre>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	with function for writing xml documents like: writeStartElement, writeEndElement.<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	As we know there are characters in xml that cannot be written to the string document since they are used by the xml format. The characters are: [&amp;&lt;&gt;&#39;\&rdquo;]. &nbsp;To overcome this when writing the xml for example, the &gt; will be changed to &amp;gt;. There are some systems that do not know how to read this string. For these systems there is the CDATA format (see <a href="http://xml.silmaril.ie/specials.html">http://xml.silmaril.ie/specials.html)</a>. A CDATA section is a string that starts with &lt;![CDATA[ and ends with ]]&gt;. Within this string you can write any text you want, for example:<o:p></o:p></div>
<pre style="background: #F9F9F9; line-height: 14.4pt; vertical-align: top;">
<span class="sc2"><span style="color: #339933;">&lt;![CDATA[&lt;sender&gt;John Smith&lt;/sender&gt;]]&gt;</span></span><o:p></o:p></pre>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	This is a legal text that will not be read as a xml mockup, but will be read as: &amp;lt;sender&amp;gt;John Smith&amp;lt;/sender&amp;gt;<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	Back to our case. Let&rsquo;s say that we want to convert some of the text to CDATA but the XMLStreamWriter does not support this. We would like to override the function of writeCharacters. So how do we override an interface implementation? There are two way that are more or less the same, but one is more explicit and the other generic.<o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	We will start with the specific solution. An interface is a contract that specifies an api without the implementation. The factory builder returns the interface with a specific implementation behind it. What we do is create a new class that holds a reference to the current instance and implements the interface. The all methods are delegated to the internal reference, and those methods that we want to override we can. For example (not a full class implementation):<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> DelegatingXMLStreamWriter </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">implements</span></b><span style="font-family: Consolas; font-size: 10pt;"> XMLStreamWriter {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; XMLStreamWriter </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">delegate</span><span style="font-family: Consolas; font-size: 10pt;">;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> DelegatingXMLStreamWriter(XMLStreamWriter del) {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">delegate</span><span style="font-family: Consolas; font-size: 10pt;"> = del;</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> close() </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">throws</span></b><span style="font-family: Consolas; font-size: 10pt;"> XMLStreamException {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">delegate</span><span style="font-family: Consolas; font-size: 10pt;">.close();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> flush() </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">throws</span></b><span style="font-family: Consolas; font-size: 10pt;"> XMLStreamException {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">delegate</span><span style="font-family: Consolas; font-size: 10pt;">.flush();</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> writeCharacters(</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">char</span></b><span style="font-family: Consolas; font-size: 10pt;">[] arg0, </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> arg1, </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">int</span></b><span style="font-family: Consolas; font-size: 10pt;"> arg2) </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">throws</span></b><span style="font-family: Consolas; font-size: 10pt;"> XMLStreamException {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">delegate</span><span style="font-family: Consolas; font-size: 10pt;">.writeCharacters(arg0, arg1, arg2);</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp; }</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="text-align: justify;">
	<span style="font-family: Consolas; font-size: 10pt; line-height: 107%;">}</span><o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	As you can see all that the class does is to delegate all functionally to the instance that was created by the factory, and specific implementations can be override (This class is a helper class that can be found at <a href="http://java.net/projects/stax-utils/pages/Home">http://java.net/projects/stax-utils/pages/Home</a>). <o:p></o:p></div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	The second way to do this is not to explicitly write a class that delegates all the methods (they can be tens of methods), but to create a proxy object and the catch only the one method that needs to be overridden:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">XMLStreamWriter <u>proxyXMLStreamWriter</u> = (XMLStreamWriter)Proxy.<i>newProxyInstance</i>(XMLStreamWriter.</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;">.getClassLoader(),</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> Class[] { XMLStreamWriter.</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> },</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> InvocationHandler() {</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<span style="color: #646464; font-family: Consolas; font-size: 10.0pt;">@Override</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> Object invoke(Object arg0, Method arg1, Object[] arg2) {<o:p></o:p></span></div>
<div class="MsoNormal" style="margin: 0in 0in 0.0001pt 0.5in; text-indent: 0.5in;">
	<span style="font-family: Consolas; font-size: 10pt;">if(method.getName().equals(&quot;writeCharacters&quot;) {<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // override specific method with functionality<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	&nbsp;</div>
<div class="MsoNormal" style="margin: 0in 0in 0.0001pt 0.5in; text-indent: 0.5in;">
	<span style="font-family: Consolas; font-size: 10pt;">}<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt; text-indent: 0.5in;">
	<span style="font-family: Consolas; font-size: 10pt;">});<o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
	<span style="font-family: Consolas; font-size: 10pt;">}</span><span style="font-family: Consolas; font-size: 10.0pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	Summary:<o:p></o:p></div>
<div class="MsoNormal">
	As you can see it is fairly easy to add functionality even to a class that you do not have the source code for. This is done using the proxy/delegation pattern.<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal" style="text-align: justify;">
	&nbsp;</div>
