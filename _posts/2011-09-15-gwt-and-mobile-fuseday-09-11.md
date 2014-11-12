---
layout: post
title: GWT and mobile fuseday 09/11
created: 1316116348
author: aviy
permalink: /gwt-and-mobile-fuseday-0911
tags:
- JAVA
- gwt
---
<p>The lastfuse i was interesting to develop Web Application for different devices (Mobile/Tablet/Desktop) using GWT.</p>
<p>&nbsp;</p>
<p>The following issues arise&nbsp;when dealing with such task:</p>
<ol>
    <li>
    <p style="margin-bottom: 0in">Find a way to detect which device 	is running and show a different view accordingly.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in">Test our application on the Dev 	machine without compile and upload them each time.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in">Avoid rewriting the same code for 	each one of the devices.<br />
    &nbsp;</p>
    the result can be found in :<a href="http://fuseday.appspot.com/"> http://fuseday.appspot.com</a>&nbsp;(it has no real functionalty but you can see different view for mobile and desktop)<br type="_moz" />
    &nbsp;</li>
</ol>
<p>The soultion for these issues where as follow:</p>
<ol>
    <li>
    <p style="margin-bottom: 0in">In order to detect device type 	(formfactor) we are using FormFactor module, which include 	PropertyProvider written in JavaScript. <br />
    &nbsp;</p>
    <p style="margin-bottom: 0in">It was taken from GWT 2.4 example  	&ldquo;<font size="3" style="font-size: 13pt">gwt-2.4.0\samples\MobileWebApp</font>&rdquo;</p>
    <p style="margin-bottom: 0in">&nbsp;</p>
    <p style="margin-bottom: 0in"><font color="#008080"><font face="Courier New, monospace"><font size="2">&lt;?</font></font></font><font color="#3f7f7f"><font face="Courier New, monospace"><font size="2">xml</font></font></font> 	version<font color="#000000"><font face="Courier New, monospace"><font size="2">=</font></font></font>&quot;1.0&quot; 	encoding<font color="#000000"><font face="Courier New, monospace"><font size="2">=</font></font></font>&quot;UTF-8&quot;<font color="#008080"><font face="Courier New, monospace"><font size="2">?&gt;</font></font></font></p>
    </li>
</ol>
<p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#3f5fbf"><font face="Courier New, monospace"><font size="2">	&lt;!-- Defines the <u>formfactor</u> property and its provider function. --&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Courier New, monospace"><font size="2"><font color="#008080">	&lt;</font><font color="#3f7f7f">module</font><font color="#008080">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  <font face="Courier New, monospace"><font size="2">	</font><font color="#3f5fbf">&lt;!-- Determine if we are in a mobile browser. --&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">&lt;</font><font color="#3f7f7f">define-property</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font> <font color="#7f007f">values</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;desktop,tablet,mobile&quot;</i></font><font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">&lt;</font><font color="#3f7f7f">collapse-property</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font> <font color="#7f007f">values</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;*&quot;</i></font><font color="#008080">/&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Courier New, monospace"><font size="2">	...</font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000"> <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">&lt;</font><font color="#3f7f7f">property-provider</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font><font color="#008080">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">&lt;![CDATA[</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">      <font face="Courier New, monospace"><font size="2">// Look for the formfactor as a url argument.</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000"> <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">]]&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  <font face="Courier New, monospace"><font size="2">	</font><font color="#008080">&lt;/</font><font color="#3f7f7f">property-provider</font><font color="#008080">&gt;</font></font></font></p>
<p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
<p align="LEFT" style="margin-bottom: 0in"><font face="Courier New, monospace"><font size="2"><font color="#008080">	&lt;/</font><font color="#3f7f7f">module</font><font color="#008080">&gt;</font></font></font></p>
<p>&nbsp;</p>
<ol start="2">
    <li>
    <p style="margin-bottom: 0in">For our testing purposes, we used 	Android Development Kit (ADK) .</p>
    <p style="margin-bottom: 0in">Create a device and start emulator and 	open browser. <br />
    Note: The Host IP that should be used for the 	Android browser is 10.0.2.2 and not 127.0.0.1</p>
    <img width="710" height="472" alt="" src="/files/upload/631/adk-emulator.png" /><br />
    &nbsp;</li>
    <li>
    <p style="margin-bottom: 0in">In order to avoid code rewriting 	we are using MVP (Model/View/Presenter) when Model and presenter are 	being used for all devices and each view is being created 	accordingly.<br />
    &nbsp;</p>
    <p style="margin-bottom: 0in">To bind each of the views to it's 	corresponding  fromfactor, we used deferred binding.<br />
    <font color="#000000"><font face="Courier New, monospace"><font size="2"> 	</font></font></font></p>
    </li>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">replace-with</font> <font color="#7f007f">class</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;com.tikal.fuseday11.client.views.DesktopTaskListView&quot;</i></font> <font color="#008080">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">   </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">when-type-assignable</font> <font color="#7f007f">class</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;com.tikal.fuseday11.client.views.TaskListView&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">   </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">any</font><font color="#008080">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">    </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">when-property-is</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font> <font color="#7f007f">value</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;desktop&quot;</i></font><font color="#008080">/&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">    </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">when-property-is</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font> <font color="#7f007f">value</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;tablet&quot;</i></font><font color="#008080">/&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">    </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;/</font><font color="#3f7f7f">any</font><font color="#008080">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;/</font><font color="#3f7f7f">replace-with</font><font color="#008080">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">  </font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">   </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">replace-with</font> <font color="#7f007f">class</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;com.tikal.fuseday11.client.views.MobileTaskListView&quot;</i></font> <font color="#008080">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">   </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">when-type-assignable</font> <font color="#7f007f">class</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;com.tikal.fuseday11.client.views.TaskListView&quot;</i></font> <font color="#008080">/&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">    </font><font face="Courier New, monospace"><font size="2"><font color="#008080">&lt;</font><font color="#3f7f7f">when-property-is</font> <font color="#7f007f">name</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;formfactor&quot;</i></font> <font color="#7f007f">value</font><font color="#000000">=</font><font color="#2a00ff"><i>&quot;mobile&quot;</i></font><font color="#008080">/&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in"><font color="#000000">   </font><font color="#008080"><font face="Courier New, monospace"><font size="2">&lt;/</font></font></font><font color="#3f7f7f"><font face="Courier New, monospace"><font size="2">replace-with</font></font></font><font color="#008080"><font face="Courier New, monospace"><font size="2">&gt;</font></font></font></p>
    <p align="LEFT" style="margin-bottom: 0in">&nbsp;</p>
</ol>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
