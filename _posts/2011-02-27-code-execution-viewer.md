---
layout: post
title: 'Code execution viewer '
created: 1298791308
permalink: code-execution-viewer
tags:
- JS
- sequence diagram
- mm.cfg
- flex
- fdb.exe
- fdb
- Debugging
- code execution
---
<p>&nbsp;<font face="Times New Roman, serif">This Fuse day session is a follow up on a post on the subject of <a href="http://www.tikalk.com/flex/integrating-sequence-diagrams-with-debugger-actionscript">using sequence diagram for visualizing executing code flow</a>. </font></p>
<p align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Group members: <a href="http://www.tikalk.com/users/yoavmoran">Yoav Moran</a>, <a href="http://www.tikalk.com/users/oren">Oren weinberg</a>, <a href="http://www.tikalk.com/users/shair">Shay Reznik</a>, <a href="http://www.tikalk.com/users/sefi">Sefi Ninio </a>and myself.</font></p>
<p align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The benefits of such a tool are:</font></p>
<p align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">1. Compare code execution before and after code refactor.</font></p>
<p align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">2. Help with understanding execution of unfamiliar code.</font></p>
<p align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">3. Relate between code executed in seperate frames. anyone who debugged flex applications is familiar with this pain.</font></p>
<p align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The ultimate goal is to end up with visualization for code execution similar to this (taken from <a href="http://www.sparxsystems.com/products/ea/index.html">enterprise architect</a>):</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif"><img height="368" alt="" width="367" src="/files/debugging.JPG" /></font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">In an attempt to create such a tool, we explored the following options:</font></p>
<ol>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Analyze flash debugger traces.</font></p>
    </li>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Use fdb.exe.</font></p>
    </li>
</ol>
<p>&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><strong><font face="Times New Roman, serif">1. Analyze flash debugger traces</font></strong></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">By modifying mm.cfg we get lots of info which includes lots of noise which is hard to filter.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">We used the following flags:</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">TraceOutputBuffered = 1</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">AS3Trace = 1</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">ErrorReportingEnable= 1</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">In addition, the information is not clear enough with regards to the actual line of code executed.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><strong><font face="Times New Roman, serif">2. Using fdb.exe </font></strong></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">We got to this option by examining the source code of <a href="http://www.flashdevelop.org/wikidocs/index.php?title=Main_Page">flashdevelop</a>.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">FlashDevelop is an open source c# application with a debugger executing fdb in a shell (JVM executes fdb.exe), then read and write to the standard input/output in order to communicate with it.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Integrating code execution view as a view in flashDevelop may be a good idea, however, at this stage we didn&rsquo;t want to bother with delving into flashdevelop code.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The advantage of working with fdb is that it provides only relevant debugging information, and allow examine the call stack.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><strong><font face="Times New Roman, serif">Communicating with fdb</font></strong></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">We set up in two paths of communicating with fdb:</font></p>
<ol>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Air application interacting with fdb via stdin/out.</font></p>
    </li>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Use fdb as a library. Interaction is made by traditional java function calls and return values. </font></p>
    </li>
</ol>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif"><b>1. Air application</b></font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Starting with Air 2.0, we used <a href="http://www.flexpasta.com/index.php/2009/12/01/command-line-execution-in-air-20/">this&nbsp;code sample </a>as the basis of the application. Unfortunately, we came across the same compilation issues (compile errors in the NativeProcess etc.) like the author.</font> <font face="Times New Roman, serif">Moving to Burito, with Air 2.5, solved the issue.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif"><b>2. Use fdb as library</b></font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Taking the Java source of fdb.jar (Flex SDK 4.0) we&rsquo;ve entered changes that will execute the needed logic &ndash; run a swf in debug mode, and gather the step-into results. This could be used combined with a Swing interface to initiate the debug session and display the flow.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The code attached runs the debugger, showing the flow in console. Command line accepts 2 parameters &ndash; the swf path/name and the name of the function we want to start showing the flow from.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><strong><font face="Times New Roman, serif">using fdb for getting code execution data</font></strong></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">In order to get the required data needed to visualize code execution, we used fdb &ldquo;step&rdquo; command, which returns data describing the current code line.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Allowing a single step is straight forward, and the challenge is offering a &ldquo;Resume and record&rdquo; mode, which should behave like flash builder's &ldquo;Resume&rdquo; command (F8 shortcut), with recording abilities.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The resume command should execute till it meets a breakpoint, or until the application becomes idle.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">In order to achieve this, we forced fdb to continuously &ldquo;step into&rdquo; the code, visualizing the execution as it goes along.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The challenges we faced with the &ldquo;Resume and record&rdquo; mode are:</font></p>
<ol>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">How to avoid stepping into Flex libraries (or allowing the user to decide whether he wants to)</font></p>
    </li>
    <li>
    <p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">How to identify that the application is idle. Continously calling &ldquo;step&rdquo; on fdb resulted with endless debugging.</font></p>
    </li>
</ol>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Avoiding stepping into Flex libraries may not be possible, but we can at least not display them to the user by filtering them.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">Identify that the application is idle turned out to be quite problematic, and eventually we used a specific string pattern (&ldquo;<font color="#990000"><font face="Courier New, monospace"><font size="2"><b>Execution halted, FocusManager&rdquo;</b></font></font></font>) to identify that our debugged code block is finished. This is a hack which should be solved.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><strong><font face="Times New Roman, serif">The result</font></strong></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">We ended up with an Air application which uses fdb to automatically launch a test app, set breakpoints on it, and record its code execution, visualizing it in a very basic, but clear sequence diagram.</font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif"><img height="800" alt="" width="1280" src="/files/res.JPG" /></font></p>
<p dir="ltr" align="left" style="margin-bottom: 0cm">&nbsp;</p>
<p dir="ltr" align="left" style="margin-bottom: 0cm"><font face="Times New Roman, serif">The code is attached.</font></p>
