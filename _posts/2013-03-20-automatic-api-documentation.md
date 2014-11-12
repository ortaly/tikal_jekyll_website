---
layout: post
title: Automatic API Documentation
created: 1363764671
author: chaim.turkel
permalink: /java/automatic-api-documentation
tags:
- JAVA
- Java
- REST
- documentation
---
<!-- Include required JS files --><script type="text/javascript" src="js/shCore.js"></script><!--    At least one brush, here we choose JS. You need to include a brush for every     language you want to highlight--><script type="text/javascript" src="css/shBrushJScript.js"></script><!-- Include *at least* the core style and default theme -->
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>
	<link href="css/shCore.css" rel="stylesheet" type="text/css" />
</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>
	<link href="css/shThemeDefault.css" rel="stylesheet" type="text/css" />
</p>
<br />
<div class="MsoNormal">
	Documentation of API is always needed. Some protocols and standards support better documentation then others. Soap for instance supports better documentation than rest, but still needs explicit documentation so that clients can know how to use it.<o:p></o:p></div>
<div class="MsoNormal">
	Rest is known as a more problematic protocol since it is not self-documented.<o:p></o:p></div>
<div class="MsoNormal">
	Another issue is of course the problem that the code changes often after the spec has been written.<o:p></o:p></div>
<div class="MsoNormal">
	For this there a frameworks that create documentation from your code, and can be a part of your site.<o:p></o:p></div>
<div class="MsoNormal">
	This way the documentation is up to date and is available at all times.<o:p></o:p></div>
<div class="MsoNormal">
	There are multiple frameworks that do this. A list are:<o:p></o:p></div>
<div class="MsoNormal">
	<a href="http://enunciate.codehaus.org/">http://enunciate.codehaus.org/</a><o:p></o:p></div>
<div class="MsoNormal">
	<a href="https://developers.helloreverb.com/swagger/">https://developers.helloreverb.com/swagger/</a><o:p></o:p></div>
<div class="MsoNormal">
	<a href="http://rubygems.org/gems/calamum">http://rubygems.org/gems/calamum</a><o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	In this blog I will describe the enunciate framework, since this framework give a rich output, and covers multiple protocols, including the option to generate client code in multiple languages to consume the rest api.<o:p></o:p></div>
<div class="MsoNormal">
	The current downside of enunciate is its documentation that is very sparse. So I will show you how to get a site up and running.<o:p></o:p></div>
<div class="MsoNormal">
	Many frameworks use proprietary annotations for the documentation which can be a hindrance if you want to change the framework. Enunciate used javadoc that is above your rest interface for documentation. It is a pity that they do not support the annotations that are part of JAX-RS (like @<span style="background: silver; color: rgb(100, 100, 100); line-height: 107%; font-family: Consolas; font-size: 10pt; mso-highlight: silver;">Description</span><span style="color: rgb(100, 100, 100); line-height: 107%; font-family: Consolas; font-size: 10pt;">)</span><o:p></o:p></div>
<div class="MsoNormal">
	For example:<o:p></o:p></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">/**</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;* Gets the location.</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;*</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;* </span><b><span style="color: rgb(127, 159, 191); font-family: Consolas; font-size: 10pt;">@param</span></b><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;"> location free text location including all fields (street, city)</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;* </span><b><span style="color: rgb(127, 159, 191); font-family: Consolas; font-size: 10pt;">@return</span></b><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;"> the location after it has been enriched </span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;* </span><b><span style="color: rgb(127, 159, 191); font-family: Consolas; font-size: 10pt;">@throws</span></b><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;"> ServiceInternalException the service internal exception</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;*/</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(100, 100, 100); font-family: Consolas; font-size: 10pt;">@GET</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(100, 100, 100); font-family: Consolas; font-size: 10pt;">@Path</span><span style="font-family: Consolas; font-size: 10pt;">(</span><span style="color: rgb(42, 0, 255); font-family: Consolas; font-size: 10pt;">&quot;/lookup/simple/{location}&quot;</span><span style="font-family: Consolas; font-size: 10pt;">)</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; LocationLookupResult getLocation(</span><span style="color: rgb(100, 100, 100); font-family: Consolas; font-size: 10pt;">@Description</span><span style="font-family: Consolas; font-size: 10pt;">(</span><span style="color: rgb(42, 0, 255); font-family: Consolas; font-size: 10pt;">&quot;String of location, your may enter the full address in one string&quot;</span><span style="font-family: Consolas; font-size: 10pt;">)</span><span style="color: rgb(100, 100, 100); font-family: Consolas; font-size: 10pt;">@PathParam</span><span style="font-family: Consolas; font-size: 10pt;">(</span><span style="color: rgb(42, 0, 255); font-family: Consolas; font-size: 10pt;">&quot;location&quot;</span><span style="font-family: Consolas; font-size: 10pt;">) String location);</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	The result will be:<o:p></o:p></div>
<div class="separator" style="text-align: center; clear: both;">
	<a href="http://4.bp.blogspot.com/-UUpA3l4hzaY/UUlimACrtTI/AAAAAAAAFMU/RVQATJGE5ak/s1600/output.png" imageanchor="1" style="margin-right: 1em; margin-left: 1em;"><img border="0" height="235" src="http://4.bp.blogspot.com/-UUpA3l4hzaY/UUlimACrtTI/AAAAAAAAFMU/RVQATJGE5ak/s320/output.png" width="320" /></a></div>
<div class="MsoNormal">
	<!--[if gte vml 1]><v:shapetype
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
</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1025" type="#_x0000_t75"
 style='width:366pt;height:300.75pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\CHAIMT~1\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><o:p></o:p></div>
<div class="MsoNormal">
	Enunciate can be run from the command line, or be added to you maven project.<o:p></o:p></div>
<pre class="brush: js">
</pre>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">plugin</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">groupId</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">org.codehaus.enunciate</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">groupId</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">artifactId</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><u><span style="font-family: Consolas; font-size: 10pt;">maven</span></u><span style="font-family: Consolas; font-size: 10pt;">-<u>enunciate</u>-<u>cxf</u>-<u>plugin</u></span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">artifactId</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">version</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">1.26.2</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">version</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">executions</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">execution</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">goals</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">goal</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><u><span style="font-family: Consolas; font-size: 10pt;">docs</span></u><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">goal</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">goals</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">configuration</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">docsDir</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">${project.build.directory}/docs</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">docsDir</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">configFile</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;">./src/main/resources/enunciate.xml</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">configFile</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">configuration</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">execution</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">executions</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">dependencies</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">dependencies</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">plugin</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<p>The secret to configuring enunciate is the enunciate.xml file, you need to configure this file properly for it to work, and all configuration is done in this file, for example:<o:p></o:p></p>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">enunciate</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">xmlns:xsi</span>=<i><span style="color: rgb(42, 0, 255);">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></i><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: rgb(127, 0, 127);">xsi:noNamespaceSchemaLocation</span>=<i><span style="color: rgb(42, 0, 255);">&quot;</span></i><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<i><span style="color: rgb(42, 0, 255); font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; http://enunciate.codehaus.org/schemas/enunciate-1.26.xsd&quot;</span></i><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: rgb(127, 0, 127);">label</span>=<i><span style="color: rgb(42, 0, 255);">&quot;Alis Documentation&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">api-import</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">pattern</span>=<i><span style="color: rgb(42, 0, 255);">&quot;com.mycompany.interfaces.*&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">api-import</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">pattern</span>=<i><span style="color: rgb(42, 0, 255);">&quot;com.mycompany.interfaces.soap.*&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">namespaces</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">services</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">soap</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">defaultSoapSubcontext</span>=<i><span style="color: rgb(42, 0, 255);">&quot;/services/&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">rest</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">defaultRestSubcontext</span>=<i><span style="color: rgb(42, 0, 255);">&quot;/api/&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">rest</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">services</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">webapp</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i><span style="color: teal;">&gt;&lt;/</span><span style="color: rgb(63, 127, 127);">webapp</span><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&lt;!-- &lt;api-classes&gt; --&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&lt;!-- &lt;include/&gt; --&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&lt;!-- &lt;exclude/&gt; --&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: rgb(63, 95, 191); font-family: Consolas; font-size: 10pt;">&lt;!-- &lt;/api-classes&gt; --&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">modules</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">disable-rule</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">id</span>=<i><span style="color: rgb(42, 0, 255);">&quot;csharp.warnings&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">disable-rule</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">id</span>=<i><span style="color: rgb(42, 0, 255);">&quot;c.warnings&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">disable-rule</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">id</span>=<i><span style="color: rgb(42, 0, 255);">&quot;obj-c.warnings&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">docs</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">docsDir</span>=<i><span style="color: rgb(42, 0, 255);">&quot;api&quot;</span></i> <span style="color: rgb(127, 0, 127);">title</span>=<i><span style="color: rgb(42, 0, 255);">&quot;ALIS API&quot;</span></i> <span style="color: rgb(127, 0, 127);">includeDefaultDownloads</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: rgb(127, 0, 127);">includeExampleXml</span>=<i><span style="color: rgb(42, 0, 255);">&quot;false&quot;</span></i><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: rgb(127, 0, 127);">disableRestMountpoint</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: rgb(127, 0, 127);">copyright</span>=<i><span style="color: rgb(42, 0, 255);">&quot;copyright&quot;</span></i> <span style="color: rgb(127, 0, 127);">forceExampleJson</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">docs</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">basic-app</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">c</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">csharp</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jaxws-ri</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jersey</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">obj-c</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">amf</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">gwt</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jboss</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">object-c</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">rubby</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">java-client</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jaxws-client</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	&nbsp;</div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">xml</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">forceExampleJson</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jaxws-support</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;false&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">cxf</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;false&quot;</span></i> <span style="color: rgb(127, 0, 127);">enableJaxrs</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: rgb(127, 0, 127);">enableJaxws</span>=<i><span style="color: rgb(42, 0, 255);">&quot;true&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">jaxws</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;false&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">spring-app</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">disabled</span>=<i><span style="color: rgb(42, 0, 255);">&quot;false&quot;</span></i> <span style="color: rgb(127, 0, 127);">mergeWebXML</span>=<i><span style="color: rgb(42, 0, 255);">&quot;./src/main/webapp/WEB-INF/web.xml&quot;</span></i><span style="color: teal;">&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">war</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">mergeWebXML</span>=<i><span style="color: rgb(42, 0, 255);">&quot;war/WEB-INF/web.xml&quot;</span></i><span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">springImport</span><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: rgb(127, 0, 127);">uri</span>=<i><span style="color: rgb(42, 0, 255);">&quot;classpath:/servicesApplicationContext.xml&quot;</span></i> <span style="color: teal;">/&gt;</span><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">spring-app</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal" style="margin-bottom: 0pt;">
	<span style="font-family: Consolas; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); font-family: Consolas; font-size: 10pt;">modules</span><span style="color: teal; font-family: Consolas; font-size: 10pt;">&gt;</span><span style="font-family: Consolas; font-size: 10pt;"><o:p></o:p></span></div>
<div class="MsoNormal">
	<span style="color: teal; line-height: 107%; font-family: Consolas; font-size: 10pt;">&lt;/</span><span style="color: rgb(63, 127, 127); line-height: 107%; font-family: Consolas; font-size: 10pt;">enunciate</span><span style="color: teal; line-height: 107%; font-family: Consolas; font-size: 10pt;">&gt;<o:p></o:p></span></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	You can have enunciate create a site or you can merge enunciate into your own site. Enunciate supports of course jax-rs with cxf jersy or spring.<o:p></o:p></div>
<div class="MsoNormal">
	The result of the enunciate process is a folder in your target folder.<o:p></o:p></div>
<div class="MsoNormal">
	If you want to add this manually to your site you need to configure the maven-war-plugin to include the following folders: docs/, docs/css, docs/js (assuming your folder is docs, defined in the maven-enunciate-cxf-plugin).<o:p></o:p></div>
<script type="text/javascript">     SyntaxHighlighter.all()</script>
