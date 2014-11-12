---
layout: post
title: JMX, MXBeans – random thoughts and ideas
created: 1401955645
author: chaim.turkel
permalink: jmx-mxbeans-random-thoughts-and-ideas
tags:
- JAVA
- Java
- jmx
- JMXTrans
---
<h1 align="center" style="text-align: center;">JMX, MXBeans &ndash; random thoughts and ideas</h1>

<p>&nbsp;</p>

<p>JMX has been around for a while. A very common use for JMX is to add it as a debug interface to a web application (<a href="https://rterp.wordpress.com/tag/mxbean/">https://rterp.wordpress.com/tag/mxbean/</a>). The truth is that JMX is much more than that.</p>

<p>&nbsp;</p>

<p>The core of JMX is MBean&rsquo;s that are created in your application and can then be manipulated via the JMX framework. The concept of JMX reminds me of the DCOM of Microsoft architecture and CORBA (see <a href="https://jcp.org/en/jsr/detail?id=70">https://jcp.org/en/jsr/detail?id=70</a> for a bridge between the two). In essence you create an MBean on the server (in the MBeanServer), and you can then access this information from any other machine.</p>

<p>&nbsp;</p>

<p>The objects in JMX are organized in an ObjectName, which is a tree hierarchy of names. This concept is actually very similar to the SNMP MIB structure.</p>

<p>&nbsp;</p>

<p>JMX supports attributes, operations and notifications. I have seen companies build full infrastructures of application monitoring on top of JMX (including synchronizing information between machines via JMX). Since you have <i>attributes</i> you can save state within the MBean. With the <i>operations</i> you can have method actions externalized, and with the <i>notification</i> you can have external client register for events without the hassle of creating a message bus or structure for notification (of course spring support of all JMX functionality: <a href="http://docs.spring.io/spring-integration/docs/2.0.0.RC1/reference/html/jmx.html">http://docs.spring.io/spring-integration/docs/2.0.0.RC1/reference/html/jmx.html</a>).</p>

<p>&nbsp;</p>

<p>Since the concept of the JMX is very open, multiple adapters have been created around the JMX ecosystem. &nbsp;Java comes with the JConsole application, so you can easily manage your MBeans even remotely. There are HTML adapters, and even SNMP adapters. So if you have a center of data that you need to share with multiple clients in multiple formats you should have a look at JMX:</p>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-7XDTSJ5Tb2U/U5ANwAoFiXI/AAAAAAAAMm8/ICZ2YP3GM1E/s1600/jmx.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="249" src="http://1.bp.blogspot.com/-7XDTSJ5Tb2U/U5ANwAoFiXI/AAAAAAAAMm8/ICZ2YP3GM1E/s1600/jmx.png" width="320" /></a>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="Picture_x0020_2" o:spid="_x0000_i1025" type="#_x0000_t75"
 alt="http://upload.wikimedia.org/wikipedia/en/thumb/d/db/Jmxarchitecture.png/400px-Jmxarchitecture.png"
 style='width:210pt;height:163.5pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title="400px-Jmxarchitecture"/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--></p>

<p>&nbsp;</p>

<p class="rteleft">If you need export you data from JMX to other platforms (like GraphIte &nbsp;or Gangila) there is a nice package called JMXTrans that comes with some build in&nbsp; writers and a framework to create new ones (<a href="https://code.google.com/p/jmxtrans/wiki/IntroductionToJmxTrans" style="text-align: center; line-height: 1.6em;">https://code.google.com/p/jmxtrans/wiki/IntroductionToJmxTrans</a><span style="text-align: center; line-height: 1.6em;">).&nbsp;</span></p>

<p>&nbsp;</p>

<p class="rteleft">If all you need is to pass the information over http protocol that you can have a look at jolokia (<a href="http://www.jolokia.org/">http://www.jolokia.org/</a>). &nbsp;</p>

<p>&nbsp;</p>

<p class="rteleft">Since is seems for some there is confusion between the two frameworks, both authors answered in the following question on the stackoverflow site: <a href="http://stackoverflow.com/questions/10151536/what-is-the-difference-between-jolokia-jmxtrans-when-to-choose-one-over-the">http://stackoverflow.com/questions/10151536/what-is-the-difference-between-jolokia-jmxtrans-when-to-choose-one-over-the</a></p>

<h1>&nbsp;</h1>

<h1 class="rteleft">MXBean</h1>

<p class="rteleft">Any class can be added to the JMX MBeanServer. If all the external actions (attributes, operations, notifications) use basic java types then you have no problem. You can use a self-written class, though the reading client must have this class in its classpath &ndash; a big constraint. To solve this issue JMX added the MXBean (<a href="http://docs.oracle.com/javase/7/docs/api/javax/management/MXBean.html">http://docs.oracle.com/javase/7/docs/api/javax/management/MXBean.html</a>) to support &ldquo;open&rdquo; types of java objects.</p>

<p>&nbsp;</p>

<p class="rteleft">Oracle: <span style="font-size: 13.5pt; line-height: 115%;">An<span class="apple-converted-space">&nbsp;</span><i>MXBean</i><span class="apple-converted-space">&nbsp;</span>is a type of MBean that references only a predefined set of data types.</span></p>

<p class="rteleft">In other words by constraining the data types of you bean, JMX can now translate you &ldquo;private classes&rdquo; to a generic format using CompositeData and TabularData classes.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">To use an MXBean you either implement an interface with MXBean suffix or use the @MXBean annotation. The other constraint of MXBean is that you must add the annotation @ConstructorProperties<span style="font-family: 'Courier New'; font-size: 10pt; line-height: 115%;"> </span>to your constructors<span style="font-family: 'Courier New'; font-size: 10pt; line-height: 115%;">.</span></p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">When you use a concrete class in your code the MBeanServer will serialize the class into a generic class of the types:&nbsp; CompositeData (<a href="http://docs.oracle.com/javase/7/docs/api/javax/management/openmbean/CompositeData.html)">http://docs.oracle.com/javase/7/docs/api/javax/management/openmbean/CompositeData.html)</a>, TabularData <a href="http://docs.oracle.com/javase/7/docs/api/javax/management/openmbean/TabularData.html">http://docs.oracle.com/javase/7/docs/api/javax/management/openmbean/TabularData.html</a>.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">These classes are similar to a hashmap, though they include information as to the type of each field. This way and client that supports the JMX MXBean can serialize this object and use it. If your client has your propriety class then you can easily serialize the MXBean back to your class.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">The MBeanServer will validate the field types of all MXBean&rsquo;s to make sure you did not use invalid types. Since you can externalize complex classes, the MXBeanServer will serialize it to one of the classes in the javax.management.openmbean package.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">For most cases you do not need to add any special code, since one the MXBean is registered in the MBeanServer any access to this server via a client, the server will property serialize the class. The only case that you need to write code is the case of notification and using the user data object.</p>

<h2 class="rteleft">Notifications</h2>

<p class="rteleft">To send a broadcast notification you create the Notification Object (<a href="http://docs.oracle.com/javase/tutorial/jmx/notifs/">http://docs.oracle.com/javase/tutorial/jmx/notifs/</a>) The notification object has some basic field like type, source, message and other fields. If you want to add your own typed payload you need to use the User Data object. For complex classes you should be using the CompositeData or the TabularData.&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">To create this class you need to specify all the fields and their types, for example:</p>

<div style="background: #FCFCFC; border-bottom: dotted #888888 1.0pt; border-left: none; border-right: none; border-top: dotted #888888 1.0pt; mso-border-bottom-alt: dotted #888888 .75pt; mso-border-top-alt: dotted #888888 .25pt; mso-element: para-border-div; padding: 4.0pt 0in 4.0pt 0in;">
<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">String</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">[]</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> names </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">=</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">{</span><span style="color: #008800; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">&quot;poolName&quot;</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #008800; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">&quot;usage&quot;</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #008800; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">&quot;count&quot;</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">};</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Object</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">[]</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> values </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">=</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">{</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #000088; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">null</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #000088; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">null</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #000088; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">null</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">};</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">OpenType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">[]</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> types </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">=</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">{</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">SimpleType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">.</span><span style="font-family: 'Courier New'; font-size: 11.5pt;">STRING</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> memoryUsageCompositeType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="font-family: 'Courier New'; font-size: 11.5pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">SimpleType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">.</span><span style="font-family: 'Courier New'; font-size: 11.5pt;">LONG </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">};</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">CompositeType</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> compositeType </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">=</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> getCompositeType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">(</span><span style="font-family: 'Courier New'; font-size: 11.5pt;">names</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> types</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">);</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; background-position: initial; background-repeat: initial; background-size: initial; border: none; margin-bottom: 0.0001pt; padding: 0in;">
<p class="rteleft"><span style="background: #F8FCCF; color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">CompositeData</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> data </span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">=</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="color: #000088; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">new</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> </span><span style="background: #F8FCCF; color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">CompositeData</span><span style="color: #660066; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">Support</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">(</span><span style="font-family: 'Courier New'; font-size: 11.5pt;">compositeType</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> names</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">,</span><span style="font-family: 'Courier New'; font-size: 11.5pt;"> values</span><span style="color: #666600; font-family: &quot;Courier New&quot;; font-size: 11.5pt; mso-fareast-font-family: &quot;Times New Roman&quot;;">);</span></p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">This is obviously not very type safe or developer oriented. The class we would like to use would be like:</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsage {</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; String </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">poolName</span><span style="font-family: Consolas; font-size: 10pt;">;</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u><span style="background: silver; mso-highlight: silver;">MemoryUsage</span></u> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">usage</span><span style="font-family: Consolas; font-size: 10pt;">;</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Integer </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">count</span><span style="font-family: Consolas; font-size: 10pt;">;</span></p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt; line-height: 115%;">}</span></p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">To solve this issue we will use a trick with the MBeanServer. As stated above if your class is an attribute or used in an operation the MBeanServer will do all the transformations for you. The problem is in the User Data scenario where you need to manually add the class. The trick is to have a helper class that inherits from <span style="background: silver; font-family: Consolas; font-size: 10pt; line-height: 115%;">StandardMBean</span><span style="font-family: Consolas; font-size: 10pt; line-height: 115%;">. </span>This class will have an internal field with your typed class. The trick is then when you want to serialize your class, you create the help class, assign the field with the value and the get the same field but via the getAttribute of the StandardMBean. This way the JMX framework will do the serialization for you. The other direction is the same. You create the helper class and assign the field using the JMX setAttribute (setting the composite data you got in the notification) and the retrieve the specific class using the standard getter.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">Sample code:</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;"> <u>PoolUsageSerializer</u> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">extends</span></b><span style="font-family: Consolas; font-size: 10pt;"> StandardMBean </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">implements</span></b><span style="font-family: Consolas; font-size: 10pt;"> <u>PoolUsageInterface</u>{</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">private</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">final</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> String </span><i><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">ATTRIBUTE_NAME</span></i><span style="font-family: Consolas; font-size: 10pt;"> = </span><span style="color: #2a00ff; font-family: Consolas; font-size: 10.0pt;">&quot;PoolUsage&quot;</span><span style="font-family: Consolas; font-size: 10pt;">;</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">protected</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsage </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">poolUsage</span><span style="font-family: Consolas; font-size: 10pt;">;</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsage getPoolUsage() { </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">poolUsage</span><span style="font-family: Consolas; font-size: 10pt;">; &nbsp;&nbsp; }</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">void</span></b><span style="font-family: Consolas; font-size: 10pt;"> setPoolUsage(PoolUsage poolUsage) { </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">this</span></b><span style="font-family: Consolas; font-size: 10pt;">.</span><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">poolUsage</span><span style="font-family: Consolas; font-size: 10pt;"> = poolUsage; }</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsageSerializer() { </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">super</span></b><span style="font-family: Consolas; font-size: 10pt;">(<u>PoolUsageInterface</u>.</span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">class</span></b><span style="font-family: Consolas; font-size: 10pt;">, </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">true</span></b><span style="font-family: Consolas; font-size: 10pt;">); }</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> Object serialize(PoolUsage poolUsage) {</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PoolUsageSerializer me = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsageSerializer();</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; me.setPoolUsage(<u>data</u>);</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> me.getAttribute(</span><i><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">ATTRIBUTE_NAME</span></i><span style="font-family: Consolas; font-size: 10pt;">);</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">public</span></b><span style="font-family: Consolas; font-size: 10pt;"> </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">static</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsage deserialize(Object userData) {</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PoolUsageSerializer me = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> PoolUsageSerializer();</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Attribute attr = </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">new</span></b><span style="font-family: Consolas; font-size: 10pt;"> Attribute(</span><i><span style="color: #0000c0; font-family: Consolas; font-size: 10.0pt;">ATTRIBUTE_NAME</span></i><span style="font-family: Consolas; font-size: 10pt;">, userData);</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; me.setAttribute(attr);</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><b><span style="color: #7f0055; font-family: Consolas; font-size: 10.0pt;">return</span></b><span style="font-family: Consolas; font-size: 10pt;"> me.getPoolUsage();</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</span></p>

<p class="rteleft">&nbsp;</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">
<p class="rteleft"><span style="font-family: Consolas; font-size: 10pt;">}</span></p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">For more information see:</p>

<p class="rteleft"><a href="https://weblogs.java.net/blog/emcmanus/archive/2006/02/what_is_an_mxbe.html">https://weblogs.java.net/blog/emcmanus/archive/2006/02/what_is_an_mxbe.html</a></p>

<p class="rteleft">&nbsp;</p>

<h2 class="rteleft">Security</h2>

<p class="rteleft">JMX also supports the option to secure the server with user name and password. You can also assign roles (read/write) per user, and even secure communications via ssl. For securing your JMX on tomcat see <a href="http://tomcat.apache.org/tomcat-7.0-doc/monitoring.html">http://tomcat.apache.org/tomcat-7.0-doc/monitoring.html</a>.</p>

<p class="rteleft">&nbsp;</p>

<p class="rteleft">&nbsp;</p>

<p>&nbsp;</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
