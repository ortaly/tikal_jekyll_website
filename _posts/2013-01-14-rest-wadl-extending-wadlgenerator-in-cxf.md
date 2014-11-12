---
layout: post
title: REST WADL / Extending WadlGenerator in CXF
created: 1358185264
author: chaim.turkel
permalink: /java/blog/rest-wadl-extending-wadlgenerator-cxf
tags:
- JAVA
- REST
---
<p>&nbsp;REST WADL / Extending <span style="font-size:10.0pt;
line-height:107%;font-family:Consolas;color:black;background:silver;mso-highlight:
silver">WadlGenerator</span><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black"> in CXF</span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">A problem in the world of wadl, is that the documentation level on the wadl level is not great.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">An example:<o:p></o:p></span></p>
<p class="MsoNormal">&lt;resource path=&quot;/agents&quot;&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;method name=&quot;GET&quot;&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;request&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;param name=&quot;externalAgentRef&quot; style=&quot;query&quot; type=&quot;xs:string&quot;/&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/request&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;response&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>&lt;representation mediaType=&quot;application/json&quot;/&gt;<o:p></o:p></b></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/response&gt;<o:p></o:p></p>
<p class="MsoNormal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/method&gt;<o:p></o:p></p>
<p class="MsoNormal">&lt;/resource&gt;<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">In this example you can see that the default <span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black;
background:silver;mso-highlight:silver">WadlGenerator</span><span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black"> will display all parameters in the input, but the output is defined as application/json. What we want is for the xml to describe the object that is serialized on the output.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Solution:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">To do this we need do define a provider for the jaxrs:<o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:Consolas;color:teal">&lt;</span><span style="font-size:10.0pt;
font-family:Consolas;color:#3F7F7F">jaxrs:providers</span><span style="font-size:10.0pt;font-family:Consolas;color:teal">&gt;</span><span style="font-size:10.0pt;font-family:Consolas"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-indent:
.5in;line-height:normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:10.0pt;font-family:Consolas;color:teal">&lt;</span><span style="font-size:10.0pt;font-family:Consolas;color:#3F7F7F;background:silver;
mso-highlight:silver">bean</span><span style="font-size:10.0pt;font-family:
Consolas"> <span style="color:#7F007F">class</span><span style="color:black">=</span><i><span style="color:#2A00FF">&quot;...WadlGeneratorEx&quot;</span></i><span style="color:teal">&gt;</span><span style="color:black"> </span><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-top:0in;margin-right:0in;margin-bottom:0in;
margin-left:.5in;margin-bottom:.0001pt;text-indent:.5in;line-height:normal;
mso-layout-grid-align:none;text-autospace:none"><span style="font-size:10.0pt;
font-family:Consolas;color:teal">&lt;</span><span style="font-size:10.0pt;
font-family:Consolas;color:#3F7F7F">property</span><span style="font-size:10.0pt;
font-family:Consolas"> <span style="color:#7F007F">name</span><span style="color:black">=</span><i><span style="color:#2A00FF">&quot;linkJsonToXmlSchema&quot;</span></i> <span style="color:#7F007F">value</span><span style="color:black">=</span><i><span style="color:#2A00FF">&quot;true&quot;</span></i> <span style="color:teal">/&gt;</span><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-indent:
.5in;line-height:normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:10.0pt;font-family:Consolas;color:teal">&lt;/</span><span style="font-size:10.0pt;font-family:Consolas;color:#3F7F7F;background:silver;
mso-highlight:silver">bean</span><span style="font-size:10.0pt;font-family:
Consolas;color:teal">&gt;</span><span style="font-size:10.0pt;font-family:Consolas;
color:black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10.0pt;
font-family:Consolas"><o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:Consolas;color:#3F7F7F">&lt;/jaxrs:providers&gt;<o:p></o:p></span></p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none"><span style="font-size:
10.0pt;font-family:Consolas;color:#3F7F7F">&nbsp;</span></p>
<p class="MsoNormal">CXF does not have a standard interface for the Wadl generator, so you need to extend the current <span style="font-size:10.0pt;
line-height:107%;font-family:Consolas;color:black;background:silver;mso-highlight:
silver">WadlGenerator</span><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black"> (<a href="http://cxf.apache.org/javadoc/latest/org/apache/cxf/jaxrs/model/wadl/WadlGenerator.html">http://cxf.apache.org/javadoc/latest/org/apache/cxf/jaxrs/model/wadl/WadlGenerator.html</a>).<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Since the class was not created properly for overriding methods, I copied to whole class to a new class with the inheritance of:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black;background:silver;mso-highlight:silver">public class WadlGeneratorEx extends WadlGenerator implements RequestHandler<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">On the method: <span style="background:silver;mso-highlight:
silver">private void handleRepresentation</span>, I added the following line:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black;background:silver;mso-highlight:silver">sb.append(&quot; classImpl=\&quot;&quot;).append(type.getSimpleName()).append(&quot;\&quot;&quot;);<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black;background:silver;mso-highlight:silver"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">The new output looks like:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&lt;representation mediaType=&quot;application/json&quot; classImpl=&quot;Agent&quot;/&gt;<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">You can now add any other xml attributes you need for documentation.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black;background:silver;mso-highlight:silver"><o:p>&nbsp;</o:p></span></p>
<p>&nbsp;</p>
