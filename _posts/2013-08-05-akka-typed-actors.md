---
layout: post
title: Akka Typed Actors
created: 1375693130
author: lior.perry
permalink: /akka-typed-actors
tags:
- JAVA
- Akka
---
<p><span class="SpellE"><b><span style="font-size:21.5pt;
font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;color:#5381A2;mso-font-kerning:18.0pt">Akka</span></b></span><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;color:#5381A2;
mso-font-kerning:18.0pt"> Typed Actors</span></b></p>
<div class="WordSection1" dir="RTL">
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:9.0pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
color:#333333"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:9.0pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
color:#333333">In short:<o:p></o:p></span></b></p>
	<p class="MsoSubtitle" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span class="SpellE"><span style="font-size:11.0pt;line-height:115%">Akka</span></span><span style="font-size:11.0pt;line-height:115%"> aims to be the platform for the next-generation, event-driven, scalable, and fault-tolerant architectures on the JVM. One of the core features of <span class="SpellE">Akka</span> is an implementation of the Actor model. It alleviates the developer from having to deal with explicit locking and thread management. Using the Actor model raises the abstraction level and provides a better platform for building correct concurrent and scalable applications.</span><b><span style="font-size:
20.5pt;line-height:115%;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;;color:#5381A2;mso-font-kerning:18.0pt"><o:p></o:p></span></b></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">In Details:<o:p></o:p></span></b></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span class="SpellE"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;;background:#F2F2EB">Akka</span></span><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
background:#F2F2EB"> </span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">authors believe that writing correct concurrent, fault-tolerant and scalable applications is too hard. <span class="GramE">Most of the time it&#39;s because we are using the wrong tools and the wrong level of abstraction.</span><o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span class="SpellE"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">Akka</span></span><span style="font-size:10.5pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;"> hopes to change that. Using the Actor Model it raises the abstraction level and provides a better platform to build correct, concurrent, and scalable applications.<o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">For fault-tolerance it adopts the &quot;Let it crash&quot; model which the telecom industry has used with great success to build applications that self-heal and systems that never stop.<o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">Actors provide the abstraction for transparent distribution and the basis for truly scalable and fault-tolerant applications.<o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span class="SpellE"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">Akka</span></span><span style="font-size:10.5pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;"> is Open Source and available under the Apache 2 License.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB"><o:p>&nbsp;</o:p></span></p>
	<h2 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<span style="background:#F2F2EB">Adoption:<o:p></o:p></span></h2>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Since <span class="SpellE">Akka</span> implies a different programming model than the standard n-tier OOP paradigm, it is more challenging in adaptation. <span class="SpellE">Akka</span> provides an adaptation bridge to simplify the embracing of Actors into your code without dramatically changing it.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Typed actors are nice for bridging between actor systems (the &ldquo;inside&rdquo;) and non-actor code (the &ldquo;outside&rdquo;), because they allow you to write normal OO-looking code on the outside. Think of them like doors: their practicality lies in interfacing between private sphere and the public.<o:p></o:p></span></p>
	<h2 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<span style="background:#F2F2EB"><o:p>&nbsp;</o:p></span></h2>
	<h2 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<span style="background:#F2F2EB">Typed Actor<o:p></o:p></span></h2>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Turning method invocations into asynchronous dispatch instead of synchronous that has been the default way since Smalltalk came out.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Typed Actors consist of:<o:p></o:p></span></p>
	<h2 dir="LTR" style="margin-left:.5in;text-align:left;text-indent:-.25in;
mso-list:l14 level1 lfo2;direction:ltr;unicode-bidi:embed">
		<!--[if !supportLists]--><span style="font-size:12.0pt;line-height:115%;font-family:Symbol;mso-fareast-font-family:
Symbol;mso-bidi-font-family:Symbol;font-weight:normal;mso-bidi-font-weight:
bold"><span style="mso-list:Ignore">&middot;<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="mso-fareast-font-family:
&quot;Times New Roman&quot;">Public interface &ndash; </span><span style="font-size:12.0pt;
line-height:115%;mso-fareast-font-family:&quot;Times New Roman&quot;">used to communicate between different actors<o:p></o:p></span></h2>
	<p class="MsoListParagraph" dir="LTR" style="margin-top:0in;margin-right:0in;
margin-bottom:10.0pt;margin-left:.5in;mso-add-space:auto;text-align:left;
text-indent:-.25in;mso-list:l14 level1 lfo2;direction:ltr;unicode-bidi:embed"><span style="font-size:12.0pt;line-height:115%;font-family:Symbol;mso-fareast-font-family:
Symbol;mso-bidi-font-family:Symbol;color:#4F81BD;mso-themecolor:accent1;
mso-bidi-font-weight:bold"><span style="mso-list:Ignore">&middot;<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><b><span style="font-size:
13.0pt;line-height:115%;font-family:&quot;Cambria&quot;,&quot;serif&quot;;mso-ascii-theme-font:
major-latin;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-hansi-theme-font:
major-latin;mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#4F81BD;mso-themecolor:accent1">Implementation &ndash;</span></b><b><span style="font-size:12.0pt;line-height:115%;font-family:&quot;Cambria&quot;,&quot;serif&quot;;
mso-ascii-theme-font:major-latin;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-hansi-theme-font:major-latin;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:major-bidi;color:#4F81BD;mso-themecolor:accent1"> used to do actual business logic<o:p></o:p></span></b></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Typed actors are nice for bridging between actor systems (the &ldquo;inside&rdquo;) and non-actor code (the &ldquo;outside&rdquo;), because they allow you to write normal OO-looking code on the outside.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><i><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">Typed Actors are implemented using<span class="apple-converted-space">&nbsp;</span></span></i><a href="http://docs.oracle.com/javase/6/docs/api/java/lang/reflect/Proxy.html"><i><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;color:#73A600;
background:#F2F2EB">JDK Proxies</span></i></a><i><span style="font-size:10.5pt;
line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB"><o:p></o:p></span></i></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:
embed"><span style="font-size:10.5pt;line-height:115%;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">The advantage of Typed Actors is that with <span class="SpellE">TypedActors</span> you have a static contract, and don&#39;t need to define your own messages</span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
color:#5381A2;mso-font-kerning:18.0pt">Example<o:p></o:p></span></b></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Creating Typed Actors<o:p></o:p></span></h2>
	</div>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">To create a Typed Actor you need to have one or more interfaces, and one implementation.<o:p></o:p></span></p>
	<h3 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<o:p>&nbsp;</o:p></h3>
	<h3 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<span style="font-size:13.0pt;line-height:115%">Public interface</span><span style="font-size:13.0pt;line-height:115%;color:windowtext"><o:p></o:p></span></h3>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
line-height:15.0pt;background:#FEFBF3;word-break:break-all">
<span style="font-size:9.0pt;color:#30A628">
<span class="GramE"><span class="kwd">public</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="kwd"><span style="font-size:9.0pt;color:#30A628">interface</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Squarer</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">{</span></span><span style="font-size:
9.0pt;color:#333333"><o:p></o:p></span></pre>
	<pre dir="LTR" style="mso-margin-top-alt:
auto;mso-margin-bottom-alt:auto;line-height:15.0pt;background:#FEFBF3;
word-break:break-all">
<span class="pln"><span style="font-size:9.0pt;color:#595050"><span style="mso-spacerun:yes">&nbsp; </span></span></span><span class="GramE"><span class="kwd"><span style="font-size:9.0pt;color:#30A628">void</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">squareDontCare</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="SpellE"><span class="kwd"><span style="font-size:9.0pt;color:#30A628">int</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">i</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//fire-forget</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:15.0pt;
background:#FEFBF3;word-break:break-all">
<span class="pln"><span style="font-size:9.0pt;color:#595050"><span style="mso-spacerun:yes">&nbsp; </span></span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Future</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&lt;</span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Integer</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&gt;</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="GramE">square<span class="pun">(</span></span></span></span><span class="SpellE"><span class="kwd"><span style="font-size:9.0pt;color:#30A628">int</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">i</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//non-blocking send-request-reply</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:15.0pt;
background:#FEFBF3;word-break:break-all">
<span class="pln"><span style="font-size:9.0pt;color:#595050"><span style="mso-spacerun:yes">&nbsp; </span></span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Option</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&lt;</span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Integer</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&gt;</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE"><span class="GramE">squareNowPlease</span></span></span></span><span class="GramE"><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span></span><span class="SpellE"><span class="kwd"><span style="font-size:9.0pt;color:#30A628">int</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">i</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//blocking send-request-reply</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:15.0pt;
background:#FEFBF3;word-break:break-all">
<span class="pln"><span style="font-size:9.0pt;color:#595050"><span style="mso-spacerun:yes">&nbsp; </span></span></span><span class="SpellE"><span class="GramE"><span class="kwd"><span style="font-size:9.0pt;
color:#30A628">int</span></span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">squareNow</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="SpellE"><span class="kwd"><span style="font-size:9.0pt;color:#30A628">int</span></span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">i</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//blocking send-request-reply</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;line-height:15.0pt;
background:#FEFBF3;word-break:break-all">
<span class="pun"><span style="font-size:9.0pt;color:#595050">}</span></span><span style="font-size:
9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:13.0pt;font-family:&quot;Cambria&quot;,&quot;serif&quot;;
mso-ascii-theme-font:major-latin;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-fareast-theme-font:major-fareast;mso-hansi-theme-font:major-latin;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#4F81BD;mso-themecolor:accent1">Implementation<o:p></o:p></span></b></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">class</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">implements</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">Squarer</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> {</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">private</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#008FA9">String</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> name;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed">&nbsp;</p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;public</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">() {</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;this</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">.name = </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#83B925">&quot;default&quot;</span><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">;}</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; public</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> </span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">(</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">String</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> name) {</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">this</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">.name = name; }</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; public</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> </span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">void</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">squareDontCare</span>(</span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#30A628">int</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">i</span>) {</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span class="SpellE"><span class="GramE"><span style="font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#30A628">int</span></span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> <span class="SpellE">sq</span> = <span class="SpellE">i</span> * <span class="SpellE">i</span>; </span><span style="font-size: 9pt;">}</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">public</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> </span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">Future</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">&lt;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">Integer</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">&gt; square(</span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#30A628">int</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">i</span>) {</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">return</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">Futures</span><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">.successful</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">(<span class="SpellE">i</span> * <span class="SpellE">i</span>);}</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">public</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> </span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">Option</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">&lt;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">Integer</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">&gt; <span class="SpellE">squareNowPlease</span>(</span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">int</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">i</span>) {</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">return</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">Option</span><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">.some</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">(<span class="SpellE">i</span> * <span class="SpellE">i</span>);}</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">public</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> </span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#30A628">int</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">squareNow</span>(</span><span class="SpellE" style="line-height: 15pt; text-indent: -0.25in;"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">int</span></span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">i</span>) {</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(48, 166, 40);">return</span><span style="line-height: 15pt; text-indent: -0.25in; font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">i</span> * <span class="SpellE">i</span>;}</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l0 level1 lfo8;tab-stops:list .5in;direction:ltr;unicode-bidi:embed">&nbsp;</p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:13.0pt;font-family:&quot;Cambria&quot;,&quot;serif&quot;;
mso-ascii-theme-font:major-latin;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-fareast-theme-font:major-fareast;mso-hansi-theme-font:major-latin;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#4F81BD;mso-themecolor:accent1">Instance creation</span></b></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);">Squarer</span><span style="font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);"> <span class="SpellE">otherSquarer</span> =</span><span style="font-size: 9pt; font-family: 'Courier New'; color: rgb(0, 143, 169);"> <span class="SpellE"><span class="GramE">TypedActor<span style="color:#595050">.</span><span style="color:#30A628">get</span></span></span></span><span class="GramE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#595050">(</span></span><span style="font-size: 9pt; font-family: 'Courier New'; color: rgb(89, 80, 80);">system).<span class="SpellE">typedActorOf</span>(</span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;line-height:15.0pt;direction:ltr;
unicode-bidi:embed"><span class="GramE"><span style="font-size:9.0pt;font-family:
&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">new</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">TypedProps</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&lt;</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&gt;(</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">Squarer</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">.</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">class</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">,</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628"> new</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">Creator</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&lt;</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&gt;() {</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:1.5in;text-align:left;line-height:15.0pt;direction:ltr;
unicode-bidi:embed"><span class="GramE"><span style="font-size:9.0pt;font-family:
&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">public</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> create() { </span><span style="font-size:9.0pt;font-family:
&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">return</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">new</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">(</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#83B925">&quot;foo&quot;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">); }</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:1.0in;text-align:left;line-height:15.0pt;direction:ltr;
unicode-bidi:embed"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">}),</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#83B925">&quot;name&quot;</span><span style="font-size:9.0pt;font-family:
&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">);</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:13.0pt;font-family:&quot;Cambria&quot;,&quot;serif&quot;;
mso-ascii-theme-font:major-latin;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-fareast-theme-font:major-fareast;mso-hansi-theme-font:major-latin;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#4F81BD;mso-themecolor:accent1">Method dispatching</span></b><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;color:#5381A2;
mso-font-kerning:18.0pt"><o:p></o:p></span></b></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l1 level1 lfo9;tab-stops:list .5in;background:#F2F2EB;direction:ltr;
unicode-bidi:embed"><span style="font-size: 9pt; background-color: rgb(243, 247, 233); background-position: initial initial; background-repeat: initial initial;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">void</span><span style="font-size:10.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;will be dispatched with&nbsp;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">fire-and-forget</span><span style="font-size:
10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;line-height:13.5pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed"><span style="font-size:10.0pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l1 level1 lfo9;tab-stops:list .5in;background:#F2F2EB;direction:ltr;
unicode-bidi:embed"><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">scala.concurrent.Future</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">&lt;?&gt;</span><span style="font-size:10.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;will use&nbsp;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">send-request-reply</span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;semantics, exactly like&nbsp;</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#5D8700;
background:#F3F7E9">ActorRef.ask</span></span><span style="font-size:10.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;line-height:13.5pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed"><span style="font-size:10.0pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l1 level1 lfo9;tab-stops:list .5in;background:#F2F2EB;direction:ltr;
unicode-bidi:embed"><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">scala.Option</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">&lt;?&gt;</span><span style="font-size:10.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;or&nbsp;</span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#5D8700;background:#F3F7E9">akka.japi.Option</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">&lt;?&gt;</span><span style="font-size:10.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;will use&nbsp;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">send-request-reply</span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;semantics, but&nbsp;<i>will</i>&nbsp;block to wait for an answer, and return <span class="GramE">None</span> if no answer was produced within the timeout.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;line-height:13.5pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed"><span style="font-size:10.0pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l1 level1 lfo9;tab-stops:list .5in;background:#F2F2EB;direction:ltr;
unicode-bidi:embed"><span style="font-size:
10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">Any other type of value will use&nbsp;</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#5D8700;background:#F3F7E9">send-request-reply</span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;semantics, but&nbsp;<i>will</i>&nbsp;block to wait for an answer, <span class="SpellE">throwing<span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;background:#F3F7E9">java.util.concurrent.TimeoutException</span></span>&nbsp;if there was a timeout or <span class="SpellE">rethrow</span> any exception that was thrown during this call.<o:p></o:p></span></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Messages and immutability<o:p></o:p></span></h2>
	</div>
	<h3 dir="LTR" style="margin-top:0in;text-align:left;line-height:20.25pt;
background:#F2F2EB;direction:ltr;unicode-bidi:embed">
		<span style="font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:
major-bidi;color:#2E6D82">One-way message send<o:p></o:p></span></h3>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l18 level1 lfo10;
background:#FEFBF3;word-break:break-all">
<span class="SpellE"><span class="pln"><span style="font-size:9.0pt;
color:#595050;background:yellow;mso-highlight:yellow">mySquarer</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050;background:yellow;
mso-highlight:yellow">.</span></span><span class="pln"><span style="font-size:
9.0pt;color:#595050;background:yellow;mso-highlight:yellow">squareDontCare</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050;background:yellow;
mso-highlight:yellow">(</span></span><span class="lit"><span style="font-size:
9.0pt;color:#195F91;background:yellow;mso-highlight:yellow">10</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050;background:yellow;
mso-highlight:yellow">);</span></span><span style="font-size:9.0pt;color:#333333;
background:yellow;mso-highlight:yellow"><o:p></o:p></span></pre>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:Arial;mso-bidi-theme-font:minor-bidi;background:#F2F2EB">The method will be executed on another thread; asynchronously.</span><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;color:#5381A2;
mso-font-kerning:18.0pt"><o:p></o:p></span></b></p>
	<h3 dir="LTR" style="margin-top:0in;text-align:left;line-height:20.25pt;
background:#F2F2EB;direction:ltr;unicode-bidi:embed">
		<span style="font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:
major-bidi;color:#2E6D82"><o:p>&nbsp;</o:p></span></h3>
	<h3 dir="LTR" style="margin-top:0in;text-align:left;line-height:20.25pt;
background:#F2F2EB;direction:ltr;unicode-bidi:embed">
		<span style="font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:
major-bidi;color:#2E6D82">Request-reply message send<o:p></o:p></span></h3>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l13 level1 lfo12;
background:#FEFBF3;word-break:break-all">
<!--[if !supportLists]--><span style="font-size:9.0pt;mso-fareast-font-family:&quot;Courier New&quot;;color:#333333"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Option</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&lt;</span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Integer</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&gt;</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">oSquare</span> </span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">=</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">mySquarer<span class="pun">.</span>squareNowPlease</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="lit"><span style="font-size:9.0pt;color:#195F91">10</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//Option[<span class="SpellE">Int</span>]</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This will block for timeout if needed; <span class="GramE">It</span> will return </span><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">None</span></span><span class="apple-converted-space"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">&nbsp;</span></span><span style="font-size:10.5pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">if a timeout occurs.<o:p></o:p></span></p>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l4 level1 lfo13;
background:#FEFBF3;word-break:break-all">
<!--[if !supportLists]--><span style="font-size:9.0pt;mso-fareast-font-family:&quot;Courier New&quot;;color:#333333"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span class="SpellE"><span class="kwd"><span style="font-size:9.0pt;
color:#30A628">int</span></span></span><span class="pln"><span style="font-size:
9.0pt;color:#595050"> <span class="SpellE">iSquare</span> </span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">=</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">mySquarer<span class="pun">.</span>squareNow</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="lit"><span style="font-size:9.0pt;color:#195F91">10</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//<span class="SpellE">Int</span></span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This will block for timeout if needed<span class="GramE">, <span style="mso-spacerun:yes">&nbsp;</span>throw</span> </span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">java.util.concurrent.TimeoutException</span></span></span><span class="apple-converted-space"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;</span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">if a timeout occurs.<o:p></o:p></span></p>
	<h3 dir="LTR" style="margin-top:0in;text-align:left;line-height:20.25pt;
background:#F2F2EB;direction:ltr;unicode-bidi:embed">
		<span style="font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:
major-bidi;color:#2E6D82">Request-reply-with-future message send<o:p></o:p></span></h3>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l8 level1 lfo14;
background:#FEFBF3;word-break:break-all">
<!--[if !supportLists]--><span style="font-size:9.0pt;mso-fareast-font-family:&quot;Courier New&quot;;color:#333333"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Future</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&lt;</span></span><span class="typ"><span style="font-size:9.0pt;color:#008FA9">Integer</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">&gt;</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">fSquare</span> </span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">=</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> <span class="SpellE">mySquarer<span class="pun">.</span>square</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="lit"><span style="font-size:9.0pt;color:#195F91">10</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050"> </span></span><span class="com"><span style="font-size:9.0pt;color:#93A1A1">//A Future[<span class="SpellE">Int</span>]</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This call is asynchronous, and the Future returned can be used for asynchronous composition <o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<h4 dir="LTR" style="text-align:left;direction:ltr;unicode-bidi:embed">
		<span class="SpellE">Composable</span> Futures:</h4>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">Operations on a future or a collection of futures can be chained together without blocking (as seen in the fuse day)<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
color:#5381A2;mso-font-kerning:18.0pt"><o:p>&nbsp;</o:p></span></b></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Stopping Typed Actors<o:p></o:p></span></h2>
	</div>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l11 level1 lfo15;
background:#FEFBF3;word-break:break-all">
<!--[if !supportLists]--><span style="font-size:9.0pt;mso-fareast-font-family:&quot;Courier New&quot;;color:#333333"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span class="SpellE"><span class="typ"><span style="font-size:9.0pt;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-fareast-theme-font:major-fareast;
color:#008FA9">TypedActor</span></span><span class="pun"><span style="font-size:
9.0pt;color:#595050">.</span></span><span class="kwd"><span style="font-size:
9.0pt;color:#30A628">get</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050">system</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">).</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050">stop</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="SpellE"><span class="pln"><span style="font-size:9.0pt;color:#595050">mySquarer</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This asynchronously stops the Typed Actor associated with the specified proxy ASAP.<o:p></o:p></span></p>
	<pre dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:auto;
margin-left:30.0pt;text-indent:-.25in;line-height:15.0pt;mso-list:l2 level1 lfo16;
background:#FEFBF3;word-break:break-all">
<!--[if !supportLists]--><span style="font-size:9.0pt;mso-fareast-font-family:&quot;Courier New&quot;;color:#333333"><span style="mso-list:Ignore">1.<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp; </span></span></span><!--[endif]--><span class="SpellE"><span class="typ"><span style="font-size:9.0pt;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-fareast-theme-font:major-fareast;
color:#008FA9">TypedActor</span></span><span class="pun"><span style="font-size:
9.0pt;color:#595050">.</span></span><span class="kwd"><span style="font-size:
9.0pt;color:#30A628">get</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="pln"><span style="font-size:9.0pt;color:#595050">system</span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">).</span></span><span class="SpellE"><span class="pln"><span style="font-size:9.0pt;color:#595050">poisonPill</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">(</span></span><span class="SpellE"><span class="pln"><span style="font-size:9.0pt;color:#595050">otherSquarer</span></span></span><span class="pun"><span style="font-size:9.0pt;color:#595050">);</span></span><span style="font-size:9.0pt;color:#333333"><o:p></o:p></span></pre>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This asynchronously stops the Typed Actor associated with the specified proxy after it&#39;s done with all calls that were made prior to this call.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
color:#5381A2;mso-font-kerning:18.0pt"><o:p>&nbsp;</o:p></span></b></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Typed Actor Hierarchies<o:p></o:p></span></h2>
	</div>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l7 level1 lfo18;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#008FA9">Squarer</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> <span class="SpellE">childSquarer</span> =</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:.5in;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l7 level1 lfo18;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span class="SpellE"><span class="GramE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">TypedActor</span><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">.</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">get</span></span></span><span class="GramE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">(</span></span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">TypedActor</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">.context</span></span><span style="font-size:9.0pt;font-family:
&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">()).</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:1.0in;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l7 level2 lfo18;tab-stops:list 1.0in;direction:ltr;unicode-bidi:embed"><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">typedActorOf</span></span><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050">(</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:1.5in;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l7 level3 lfo18;tab-stops:list 1.5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#30A628">new</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#595050"> </span><span class="SpellE"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:
&quot;Times New Roman&quot;;color:#008FA9">TypedProps</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&lt;</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">&gt;(</span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">Squarer</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">.</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">class</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">, </span><span class="SpellE"><span style="font-size:9.0pt;
font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#008FA9">SquarerImpl</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">.</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#30A628">class</span></span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">)</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:30.0pt;text-align:left;text-indent:-.25in;line-height:15.0pt;
mso-list:l7 level1 lfo18;tab-stops:list .5in;direction:ltr;unicode-bidi:embed"><span style="font-size:
9.0pt;font-family:&quot;Courier New&quot;;mso-fareast-font-family:&quot;Times New Roman&quot;;
color:#595050">});</span><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;color:#333333"><o:p></o:p></span></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428"><o:p>&nbsp;</o:p></span></h2>
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Receive arbitrary messages<o:p></o:p></span></h2>
	</div>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;"><o:p>&nbsp;</o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">Extend<span class="apple-converted-space">&nbsp;</span></span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">akka.actor.TypedActor.Receiver</span></span></span><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9"> &ndash; <span class="SpellE"><span class="GramE">onReceive</span></span><span class="GramE">(</span>&hellip;) </span></span><span style="font-size:10.5pt;font-family:
&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">- method.<o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This allows you to react to <span class="SpellE">DeathWatch</span><span class="apple-converted-space">&nbsp;</span></span><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;background:#F3F7E9">Terminated</span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">-messages and other types of lifecycle/system messages.<o:p></o:p></span></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;;mso-bidi-theme-font:major-bidi;
color:#0D2428">Lifecycle callbacks</span><span style="font-size:18.0pt;
font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:major-bidi;color:#0D2428"><o:p></o:p></span></h2>
	</div>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">By having your Typed Actor implementation class implement any and all of the following:<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l17 level1 lfo19;tab-stops:list .5in;background:#F2F2EB;direction:
ltr;unicode-bidi:embed"><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">TypedActor.PreStart</span></span></span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l17 level1 lfo19;tab-stops:list .5in;background:#F2F2EB;direction:
ltr;unicode-bidi:embed"><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">TypedActor.PostStop</span></span></span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l17 level1 lfo19;tab-stops:list .5in;background:#F2F2EB;direction:
ltr;unicode-bidi:embed"><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">TypedActor.PreRestart</span></span></span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi"><o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="mso-margin-top-alt:auto;mso-margin-bottom-alt:
auto;margin-left:18.75pt;text-align:left;text-indent:-.25in;line-height:13.5pt;
mso-list:l17 level1 lfo19;tab-stops:list .5in;background:#F2F2EB;direction:
ltr;unicode-bidi:embed"><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;color:#5D8700;
background:#F3F7E9">TypedActor.PostRestart</span></span></span><span style="font-size:10.0pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
Arial;mso-bidi-theme-font:minor-bidi"><o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">You can hook into the lifecycle of your Typed Actor.<o:p></o:p></span></p>
	<div style="mso-element:para-border-div;border:none;border-bottom:solid windowtext 1.0pt;
mso-border-bottom-alt:solid windowtext .75pt;padding:0in 0in 3.0pt 0in;
background:#F2F2EB">
		<h2 dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:1.5pt;
margin-left:0in;text-align:left;line-height:27.0pt;background:#F2F2EB;
direction:ltr;unicode-bidi:embed;border:none;mso-border-bottom-alt:solid windowtext .75pt;
padding:0in;mso-padding-alt:0in 0in 3.0pt 0in">
			<span class="SpellE"><span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:major-bidi;color:#0D2428">Proxying</span></span><span style="font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
mso-bidi-theme-font:major-bidi;color:#0D2428"> <span class="GramE">-<span style="mso-spacerun:yes">&nbsp; </span>a</span> kind of RPC <o:p></o:p></span></h2>
	</div>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">You can use the<span class="apple-converted-space">&nbsp;</span></span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
color:#5D8700;background:#F3F7E9">typedActorOf</span></span></span><span class="apple-converted-space"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;</span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">(takes a <span class="SpellE">TypedProps</span> and an <span class="SpellE">ActorRef</span>) to proxy the given <span class="SpellE">ActorRef</span> as a <span class="SpellE">TypedActor</span>. <o:p></o:p></span></p>
	<p dir="LTR" style="margin-top:0in;margin-right:0in;margin-bottom:6.75pt;
margin-left:0in;line-height:13.5pt;background:#F2F2EB"><span style="font-size:
10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;">This is usable if you want to communicate remotely with <span class="SpellE">TypedActors</span> on other machines, just look them up with<span class="apple-converted-space">&nbsp;</span></span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
color:#5D8700;background:#F3F7E9">actorFor</span></span></span><span class="apple-converted-space"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;</span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">and pass the<span class="apple-converted-space">&nbsp;</span></span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
color:#5D8700;background:#F3F7E9">ActorRef</span></span></span><span class="apple-converted-space"><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;
mso-bidi-font-family:&quot;Times New Roman&quot;">&nbsp;</span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">to<span class="apple-converted-space">&nbsp;</span></span><span class="SpellE"><span class="pre"><span style="font-size:9.0pt;font-family:&quot;Courier New&quot;;
color:#5D8700;background:#F3F7E9">typedActorOf</span></span></span><span style="font-size:10.5pt;font-family:&quot;Helvetica&quot;,&quot;sans-serif&quot;;mso-bidi-font-family:
&quot;Times New Roman&quot;">.<o:p></o:p></span></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
color:#5381A2;mso-font-kerning:18.0pt"><o:p>&nbsp;</o:p></span></b></p>
	<p class="MsoNormal" dir="LTR" style="margin-bottom:0in;margin-bottom:.0001pt;
text-align:left;line-height:normal;mso-outline-level:1;direction:ltr;
unicode-bidi:embed"><b><span style="font-size:21.5pt;font-family:&quot;Trebuchet MS&quot;,&quot;sans-serif&quot;;
mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
color:#5381A2;mso-font-kerning:18.0pt"><o:p>&nbsp;</o:p></span></b></p>
</div>
<script type="text/javascript">if(!NREUMQ.f){NREUMQ.f=function(){NREUMQ.push(["load",new Date().getTime()]);var e=document.createElement("script");e.type="text/javascript";e.src=(("http:"===document.location.protocol)?"http:":"https:")+"//"+"js-agent.newrelic.com/nr-100.js";document.body.appendChild(e);if(NREUMQ.a)NREUMQ.a();};NREUMQ.a=window.onload;window.onload=NREUMQ.f;};NREUMQ.push(["nrfj","beacon-3.newrelic.com","c8295a3910","2746988","NAFWN0QHDBEEAUQNXQ1LdQBCDw0MSgFbAVYKEFsRaQALDhEHQjtKEBc=",0,83,new Date().getTime(),"","","","",""]);</script>
<p>
	<link href="Akka-Integration_files/filelist.xml" rel="File-List" />
</p>
<p>
	<link href="Akka-Integration_files/themedata.thmx" rel="themeData" />
</p>
<p>
	<link href="Akka-Integration_files/colorschememapping.xml" rel="colorSchemeMapping" />
	<style type="text/css">
<!--
 /* Font Definitions */
 @font-face
	{font-family:Helvetica;
	panose-1:2 11 6 4 2 2 2 2 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536859905 -1073711037 9 0 511 0;}
@font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;
	mso-font-charset:2;
	mso-generic-font-family:auto;
	mso-font-pitch:variable;
	mso-font-signature:0 268435456 0 0 -2147483648 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1107305727 0 0 415 0;}
@font-face
	{font-family:Cambria;
	panose-1:2 4 5 3 5 4 6 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:roman;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073743103 0 0 415 0;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:-536870145 1073786111 1 0 415 0;}
@font-face
	{font-family:"Trebuchet MS";
	panose-1:2 11 6 3 2 2 2 2 2 4;
	mso-font-charset:0;
	mso-generic-font-family:swiss;
	mso-font-pitch:variable;
	mso-font-signature:647 0 0 0 159 0;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin-top:0in;
	margin-right:0in;
	margin-bottom:10.0pt;
	margin-left:0in;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
h1
	{mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-link:"Heading 1 Char";
	mso-margin-top-alt:auto;
	margin-right:0in;
	mso-margin-bottom-alt:auto;
	margin-left:0in;
	mso-pagination:widow-orphan;
	mso-outline-level:1;
	font-size:24.0pt;
	font-family:"Times New Roman","serif";
	mso-fareast-font-family:"Times New Roman";
	font-weight:bold;}
h2
	{mso-style-priority:9;
	mso-style-qformat:yes;
	mso-style-link:"Heading 2 Char";
	mso-style-next:Normal;
	margin-top:10.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:2;
	direction:rtl;
	unicode-bidi:embed;
	font-size:13.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;}
h3
	{mso-style-priority:9;
	mso-style-qformat:yes;
	mso-style-link:"Heading 3 Char";
	mso-style-next:Normal;
	margin-top:10.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:3;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;}
h4
	{mso-style-priority:9;
	mso-style-qformat:yes;
	mso-style-link:"Heading 4 Char";
	mso-style-next:Normal;
	margin-top:10.0pt;
	margin-right:0in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan lines-together;
	page-break-after:avoid;
	mso-outline-level:4;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;
	font-style:italic;}
p.MsoSubtitle, li.MsoSubtitle, div.MsoSubtitle
	{mso-style-priority:11;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-link:"Subtitle Char";
	mso-style-next:Normal;
	margin-top:0in;
	margin-right:0in;
	margin-bottom:10.0pt;
	margin-left:0in;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:12.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	letter-spacing:.75pt;
	font-style:italic;}
a:link, span.MsoHyperlink
	{mso-style-noshow:yes;
	mso-style-priority:99;
	color:blue;
	text-decoration:underline;
	text-underline:single;}
a:visited, span.MsoHyperlinkFollowed
	{mso-style-noshow:yes;
	mso-style-priority:99;
	color:purple;
	mso-themecolor:followedhyperlink;
	text-decoration:underline;
	text-underline:single;}
p
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-margin-top-alt:auto;
	margin-right:0in;
	mso-margin-bottom-alt:auto;
	margin-left:0in;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:"Times New Roman","serif";
	mso-fareast-font-family:"Times New Roman";}
pre
	{mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-link:"HTML Preformatted Char";
	margin:0in;
	margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	tab-stops:45.8pt 91.6pt 137.4pt 183.2pt 229.0pt 274.8pt 320.6pt 366.4pt 412.2pt 458.0pt 503.8pt 549.6pt 595.4pt 641.2pt 687.0pt 732.8pt;
	font-size:10.0pt;
	font-family:"Courier New";
	mso-fareast-font-family:"Times New Roman";}
p.MsoNoSpacing, li.MsoNoSpacing, div.MsoNoSpacing
	{mso-style-priority:1;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-parent:"";
	margin:0in;
	margin-bottom:.0001pt;
	text-align:right;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	margin-top:0in;
	margin-right:.5in;
	margin-bottom:10.0pt;
	margin-left:0in;
	mso-add-space:auto;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpFirst, li.MsoListParagraphCxSpFirst, div.MsoListParagraphCxSpFirst
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:.5in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	mso-add-space:auto;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpMiddle, li.MsoListParagraphCxSpMiddle, div.MsoListParagraphCxSpMiddle
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:.5in;
	margin-bottom:0in;
	margin-left:0in;
	margin-bottom:.0001pt;
	mso-add-space:auto;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
p.MsoListParagraphCxSpLast, li.MsoListParagraphCxSpLast, div.MsoListParagraphCxSpLast
	{mso-style-priority:34;
	mso-style-unhide:no;
	mso-style-qformat:yes;
	mso-style-type:export-only;
	margin-top:0in;
	margin-right:.5in;
	margin-bottom:10.0pt;
	margin-left:0in;
	mso-add-space:auto;
	text-align:right;
	line-height:115%;
	mso-pagination:widow-orphan;
	direction:rtl;
	unicode-bidi:embed;
	font-size:11.0pt;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
span.Heading1Char
	{mso-style-name:"Heading 1 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 1";
	mso-ansi-font-size:24.0pt;
	mso-bidi-font-size:24.0pt;
	font-family:"Times New Roman","serif";
	mso-ascii-font-family:"Times New Roman";
	mso-fareast-font-family:"Times New Roman";
	mso-hansi-font-family:"Times New Roman";
	mso-bidi-font-family:"Times New Roman";
	mso-font-kerning:18.0pt;
	font-weight:bold;}
span.apple-converted-space
	{mso-style-name:apple-converted-space;
	mso-style-unhide:no;}
span.Heading2Char
	{mso-style-name:"Heading 2 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 2";
	mso-ansi-font-size:13.0pt;
	mso-bidi-font-size:13.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;}
span.kwd
	{mso-style-name:kwd;
	mso-style-unhide:no;}
span.pln
	{mso-style-name:pln;
	mso-style-unhide:no;}
span.typ
	{mso-style-name:typ;
	mso-style-unhide:no;}
span.pun
	{mso-style-name:pun;
	mso-style-unhide:no;}
span.com
	{mso-style-name:com;
	mso-style-unhide:no;}
span.str
	{mso-style-name:str;
	mso-style-unhide:no;}
span.Heading3Char
	{mso-style-name:"Heading 3 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 3";
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;}
span.HTMLPreformattedChar
	{mso-style-name:"HTML Preformatted Char";
	mso-style-noshow:yes;
	mso-style-priority:99;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"HTML Preformatted";
	mso-ansi-font-size:10.0pt;
	mso-bidi-font-size:10.0pt;
	font-family:"Courier New";
	mso-ascii-font-family:"Courier New";
	mso-fareast-font-family:"Times New Roman";
	mso-hansi-font-family:"Courier New";
	mso-bidi-font-family:"Courier New";}
span.pre
	{mso-style-name:pre;
	mso-style-unhide:no;}
span.lit
	{mso-style-name:lit;
	mso-style-unhide:no;}
span.Heading4Char
	{mso-style-name:"Heading 4 Char";
	mso-style-priority:9;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:"Heading 4";
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	font-weight:bold;
	font-style:italic;}
span.SubtitleChar
	{mso-style-name:"Subtitle Char";
	mso-style-priority:11;
	mso-style-unhide:no;
	mso-style-locked:yes;
	mso-style-link:Subtitle;
	mso-ansi-font-size:12.0pt;
	mso-bidi-font-size:12.0pt;
	font-family:"Cambria","serif";
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:major-latin;
	mso-fareast-font-family:"Times New Roman";
	mso-fareast-theme-font:major-fareast;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:major-latin;
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;
	color:#4F81BD;
	mso-themecolor:accent1;
	letter-spacing:.75pt;
	font-style:italic;}
span.SpellE
	{mso-style-name:"";
	mso-spl-e:yes;}
span.GramE
	{mso-style-name:"";
	mso-gram-e:yes;}
.MsoChpDefault
	{mso-style-type:export-only;
	mso-default-props:yes;
	font-family:"Calibri","sans-serif";
	mso-ascii-font-family:Calibri;
	mso-ascii-theme-font:minor-latin;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-hansi-font-family:Calibri;
	mso-hansi-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;}
.MsoPapDefault
	{mso-style-type:export-only;
	margin-bottom:10.0pt;
	line-height:115%;}
@page WordSection1
	{size:595.3pt 841.9pt;
	margin:1.0in 1.25in 1.0in 1.25in;
	mso-header-margin:35.4pt;
	mso-footer-margin:35.4pt;
	mso-paper-source:0;
	mso-gutter-direction:rtl;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 @list l0
	{mso-list-id:162858194;
	mso-list-template-ids:1451374528;}
@list l1
	{mso-list-id:191652052;
	mso-list-template-ids:-997699126;}
@list l1:level1
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level2
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:1.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level3
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:1.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level4
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:2.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level5
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:2.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level6
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:3.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level7
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:3.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level8
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:4.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l1:level9
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:4.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l2
	{mso-list-id:228734446;
	mso-list-template-ids:986986238;}
@list l3
	{mso-list-id:260726146;
	mso-list-template-ids:-80055714;}
@list l3:level1
	{mso-level-tab-stop:.25in;
	mso-level-number-position:left;
	margin-left:.25in;
	text-indent:-.25in;}
@list l3:level2
	{mso-level-tab-stop:.75in;
	mso-level-number-position:left;
	margin-left:.75in;
	text-indent:-.25in;}
@list l3:level3
	{mso-level-tab-stop:1.25in;
	mso-level-number-position:left;
	margin-left:1.25in;
	text-indent:-.25in;}
@list l3:level4
	{mso-level-tab-stop:1.75in;
	mso-level-number-position:left;
	margin-left:1.75in;
	text-indent:-.25in;}
@list l3:level5
	{mso-level-tab-stop:2.25in;
	mso-level-number-position:left;
	margin-left:2.25in;
	text-indent:-.25in;}
@list l3:level6
	{mso-level-tab-stop:2.75in;
	mso-level-number-position:left;
	margin-left:2.75in;
	text-indent:-.25in;}
@list l3:level7
	{mso-level-tab-stop:3.25in;
	mso-level-number-position:left;
	margin-left:3.25in;
	text-indent:-.25in;}
@list l3:level8
	{mso-level-tab-stop:3.75in;
	mso-level-number-position:left;
	margin-left:3.75in;
	text-indent:-.25in;}
@list l3:level9
	{mso-level-tab-stop:4.25in;
	mso-level-number-position:left;
	margin-left:4.25in;
	text-indent:-.25in;}
@list l4
	{mso-list-id:349650112;
	mso-list-template-ids:-1724882316;}
@list l5
	{mso-list-id:428699601;
	mso-list-template-ids:-713102230;}
@list l6
	{mso-list-id:848176170;
	mso-list-template-ids:784387944;}
@list l6:level1
	{mso-level-tab-stop:78.0pt;
	mso-level-number-position:left;
	margin-left:78.0pt;
	text-indent:-.25in;}
@list l6:level2
	{mso-level-tab-stop:114.0pt;
	mso-level-number-position:left;
	margin-left:114.0pt;
	text-indent:-.25in;}
@list l6:level3
	{mso-level-tab-stop:150.0pt;
	mso-level-number-position:left;
	margin-left:150.0pt;
	text-indent:-.25in;}
@list l6:level4
	{mso-level-tab-stop:186.0pt;
	mso-level-number-position:left;
	margin-left:186.0pt;
	text-indent:-.25in;}
@list l6:level5
	{mso-level-tab-stop:222.0pt;
	mso-level-number-position:left;
	margin-left:222.0pt;
	text-indent:-.25in;}
@list l6:level6
	{mso-level-tab-stop:258.0pt;
	mso-level-number-position:left;
	margin-left:258.0pt;
	text-indent:-.25in;}
@list l6:level7
	{mso-level-tab-stop:294.0pt;
	mso-level-number-position:left;
	margin-left:294.0pt;
	text-indent:-.25in;}
@list l6:level8
	{mso-level-tab-stop:330.0pt;
	mso-level-number-position:left;
	margin-left:330.0pt;
	text-indent:-.25in;}
@list l6:level9
	{mso-level-tab-stop:366.0pt;
	mso-level-number-position:left;
	margin-left:366.0pt;
	text-indent:-.25in;}
@list l7
	{mso-list-id:860506495;
	mso-list-template-ids:-1573636792;}
@list l8
	{mso-list-id:914586738;
	mso-list-template-ids:204002976;}
@list l9
	{mso-list-id:978651159;
	mso-list-type:hybrid;
	mso-list-template-ids:-1364958870 -815785340 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
@list l9:level1
	{mso-level-start-at:0;
	mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.5pt;
	font-family:Symbol;
	mso-fareast-font-family:Calibri;
	mso-fareast-theme-font:minor-latin;
	mso-bidi-font-family:Arial;
	mso-bidi-theme-font:minor-bidi;
	color:windowtext;
	mso-ansi-font-weight:normal;}
@list l9:level2
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l9:level3
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l9:level4
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l9:level5
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l9:level6
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l9:level7
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l9:level8
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l9:level9
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l10
	{mso-list-id:1082795902;
	mso-list-template-ids:-1355543036;}
@list l11
	{mso-list-id:1222911222;
	mso-list-template-ids:1253864150;}
@list l12
	{mso-list-id:1293906955;
	mso-list-template-ids:677396440;}
@list l13
	{mso-list-id:1336884922;
	mso-list-template-ids:1728727944;}
@list l14
	{mso-list-id:1382943813;
	mso-list-type:hybrid;
	mso-list-template-ids:-1668539842 -1962399980 67698691 67698693 67698689 67698691 67698693 67698689 67698691 67698693;}
@list l14:level1
	{mso-level-start-at:0;
	mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;
	mso-fareast-font-family:"Times New Roman";
	mso-bidi-font-family:"Times New Roman";
	mso-bidi-theme-font:major-bidi;}
@list l14:level2
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l14:level3
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l14:level4
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l14:level5
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l14:level6
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l14:level7
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Symbol;}
@list l14:level8
	{mso-level-number-format:bullet;
	mso-level-text:o;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:"Courier New";}
@list l14:level9
	{mso-level-number-format:bullet;
	mso-level-text:\F0A7;
	mso-level-tab-stop:none;
	mso-level-number-position:left;
	text-indent:-.25in;
	font-family:Wingdings;}
@list l15
	{mso-list-id:1429424358;
	mso-list-template-ids:-583130194;}
@list l16
	{mso-list-id:1560944204;
	mso-list-template-ids:353939690;}
@list l17
	{mso-list-id:1908372147;
	mso-list-template-ids:775075676;}
@list l17:level1
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level2
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:1.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level3
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:1.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level4
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:2.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level5
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:2.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level6
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:3.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level7
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:3.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level8
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:4.0in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l17:level9
	{mso-level-number-format:bullet;
	mso-level-text:\F0B7;
	mso-level-tab-stop:4.5in;
	mso-level-number-position:left;
	text-indent:-.25in;
	mso-ansi-font-size:10.0pt;
	font-family:Symbol;}
@list l18
	{mso-list-id:2089570021;
	mso-list-template-ids:-455698136;}
ol
	{margin-bottom:0in;}
ul
	{margin-bottom:0in;}
-->	</style>
</p>
