---
layout: post
title: Configuring IronPython CGI on IIS 7
created: 1290445473
author: igorz
permalink: /net/configuring-ironpython-cgi-iis-7
tags:
- .NET
- .Net Open Source
- IronPython
- CGI
---
<p>This guide walks you through configuring IronPython CGI on IIS 7.<br />
<br />
<font size="4"><font style="font-weight: bold;">Install IronPython</font></font><br />
<br />
First you need to download and install IronPython at <a href="http://ironpython.codeplex.com/">http://ironpython.codeplex.com/</a>.<br />
This  post uses IronPython 2.7 Beta 1. By default, installer put the files in  C:\Program Files (x86)\IronPython 2.7. The installation path might be  changed during installation process.<br />
<br />
<font size="4" style="font-weight: bold;">Install CGI support in IIS</font><br />
<br />
By default CGI support is not installed. To turn it on, open <font style="font-style: italic; font-weight: bold;">Control Panel &gt; Programs and Features  &gt; Turn Windows features on and off</font><font style="font-weight: bold;"> dialog</font>.<br />
<br />
Select <font style="font-weight: bold;">Internet Information Services &gt; World Wide Web Services &gt; Application Development Features &gt; CGI module</font> and click <font style="font-weight: bold; font-style: italic;">OK</font><br />
<br />
<br />
<img src="http://lh6.ggpht.com/_XoCEelnLy98/TOmEXOFU95I/AAAAAAAAKxU/ShlLX9fT_f0/s800/2010-11-20%2009h41_38.png" alt="" /><br />
<br />
<font size="4" style="font-weight: bold;"><br />
Configure Handle Mapping</font><br />
<br />
Open  <font style="font-style: italic; font-weight: bold;">Control Pane &gt; </font><font style="font-style: italic; font-weight: bold;">Administrative Tools</font><font style="font-style: italic; font-weight: bold;"> &gt; Internet Information Services (IIS) Manager</font><br />
<br />
In the <font style="font-style: italic; font-weight: bold;">Features View</font>, open <font style="font-style: italic; font-weight: bold;">Handler Mappings</font>, right click to <font style="font-style: italic; font-weight: bold;">Add Script Map ...</font><br />
<br />
In <font style="font-weight: bold; font-style: italic;">Request </font>path, put &quot;*.py&quot; as the script files extension, In <font style="font-weight: bold; font-style: italic;">Executable </font>select &quot;C:\Program Files (x86)\IronPython 2.7\ipy.exe&quot; %s%s - the IronPython installation path and it's parameters.<br />
<br />
I actually don't know what such &quot;%s%s&quot; parameters mean, but believe me, you need to keep it as is.  It doesn't work without.<br />
<br />
<img src="http://lh3.ggpht.com/_XoCEelnLy98/TOmEXRpwZRI/AAAAAAAAKxY/wfHbBToWyAQ/s800/2010-11-21%2022h27_03.png" alt="" /><br />
<br />
Click <font style="font-weight: bold; font-style: italic;">OK</font>, then you will be prompt to allow this CGI extension - click <font style="font-weight: bold; font-style: italic;">OK</font>.<br />
<br />
<img src="http://lh6.ggpht.com/_XoCEelnLy98/TOmEXZWDcVI/AAAAAAAAKxc/RO_HMrDlWrw/s800/2010-11-21%2022h27_49.png" alt="" /><br />
<br />
<br />
<font size="4" style="font-weight: bold;">Run Python script</font><br />
<br />
Write a simple Python script and place it in the root folder of the  web site.<br />
<br />
<img src="http://lh6.ggpht.com/_XoCEelnLy98/TOmEXjTS1uI/AAAAAAAAKxg/_NmARkU6cEc/s800/2010-11-21%2022h28_44.png" alt="" /><br />
<br />
Point your browser to the test script and it should be working.<br />
<br />
<img src="http://lh3.ggpht.com/_XoCEelnLy98/TOmEXv0zypI/AAAAAAAAKxk/VmHEVvjkBXo/s800/2010-11-21%2022h29_58.png" alt="" /></p>
