---
layout: post
title: GWT ramblings of a Flex developer - creating your project
created: 1325609189
author: sefi
permalink: /gwt-ramblings-flex-developer-creating-your-project
tags:
- JAVA
- gwt
---
<p><span style="background-color: white; font-family: Tahoma, sans-serif; font-size: 10.5pt; line-height: 15.75pt; ">First, a small update:</span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">Those who read my last post,<span class="apple-converted-space">&nbsp;</span><a href="http://www.tikalk.com/java/gwt-ramblings-flex-developer-first-impressions"><span style="text-decoration: none; ">here</span></a>, know that I was planning to use MVP with gwt-dispatch.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">Well, at the time, GWTP seemed like an overhead and it included a fork of gwt-dispatch anyway so I thought MVP with gwt-dispatch would be lightweight and straight forward.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;"><u1:p>&nbsp;</u1:p></span></p>
<!--break-->
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">But, it seems GWTP has a lot more punch to it.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">First, it allows for nested presenters, which is good. Second, it's dispatch mechanism is like gwt-dispatch on steroids. Third, a lot of the boiler plate code is generated for you, especially if you use the GWTP eclipse plugin. Plus, it has annotations for auto generated DTOs and the like.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">So, eventually, we decided to go with GWTP.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;"><u1:p>&nbsp;</u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">Well, that decided, I set out to create the client side eclipse project.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">I created a Maven enabled project. The pom.xml file included the&nbsp;GWT-maven-plugin.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;"><u1:p>&nbsp;</u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">The result was a nightmare. Every build took 3-5 minutes, even after setting the permutations to only build for FF.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;"><u1:p>&nbsp;</u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">I wanted to have a work process where I code in Java and, using the development mode, run\debug the Java code with the server BackEnd running and responding to client requests, and to be able to build in a few seconds if I was to keep my sanity.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;"><u1:p>&nbsp;</u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">Below is what I did.<u1:p></u1:p><o:p></o:p></span></p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="font-size:10.5pt;font-family:
&quot;Tahoma&quot;,&quot;sans-serif&quot;">1.</span><span style="font-size:7.0pt">&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span><span style="font-size:10.5pt;
font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;">Since it's a maven project, it's not a gwt project out of the box.<br />
Mark it as a gwt project (right click -&gt; properties -&gt; Google -&gt; Web Toolkit).</span></p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial">&nbsp;</p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">2.</span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">Run the project as a Web Application. You will be prompted where to deploy the WAR - select the snapshot folder on the target folder</span></p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial">&nbsp;</p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">3.</span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">Install tomcat on your machine and define it in eclipse.&nbsp;</span><span style="font-size: 10.5pt; "><font face="Tahoma, sans-serif">After you do that, go to the tomcat properties and under publishing, select 'never publish automatically'.<br />
</font></span><span style="font-size: 10.5pt; "><font face="Tahoma, sans-serif"><br />
You see, tomcat looks for the WAR file under the target folder, that's why we did step 2. The thing is, that when you have tomcat publish automatically, it changes files in the target folder as part of the publish process, which, of course, triggers another publish process&hellip; you can imagine where this is going&hellip;</font><br />
<font face="Tahoma, sans-serif"> Setting to 'never publish automatically' does not mean you have to publish every time you make a code change - that is still synced.</font><span class="apple-converted-space" style="font-family: Tahoma, sans-serif; ">&nbsp;</span></span></p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial">&nbsp;</p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">4.</span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">Publish and start the server</span></p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial">&nbsp;</p>
<p dir="LTR" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;margin-left:
36.0pt;margin-bottom:.0001pt;text-indent:-18.0pt;line-height:15.75pt;
background:white;background-image:initial;background-attachment:initial;
background-origin: initial;background-clip: initial;background-position:initial initial;
background-repeat:initial initial"><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">5.</span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;<span class="apple-converted-space">&nbsp;</span></span><span style="background-color: white; line-height: 15.75pt; text-indent: -18pt; font-size: 10.5pt; font-family: Tahoma, sans-serif; ">Comment out the gwt-maven-plugin in the pom.xml file.&nbsp;</span><span style="font-size: 10.5pt; "><font face="Tahoma, sans-serif">We don't need it in development, since we are using development mode to run\debug.</font><br />
<!--[endif]--><font face="Tahoma, sans-serif"><o:p></o:p></font></span></p>
<p><u1:p></u1:p></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white">&nbsp;</p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;;
background:white">So, final setup for day-to-day development is start the server and publish, then run the project as a web application in development mode. Since both are up, client-server RPC calls will work as you expect and you can still debug your Java code.</span><span style="font-size:10.5pt;
font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;"><o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;"><o:p>&nbsp;</o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;">Sheesh!<br />
Next post will describe how to use Action\Result objects (Command\Response in gwt-talk) to make RPC calls.&nbsp;<o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;">Newsflash - it is not as simple as you might think...<o:p></o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;"><o:p>&nbsp;</o:p></span></p>
<p dir="LTR" style="margin:0cm;margin-bottom:.0001pt;line-height:15.75pt;
background:white"><span style="font-size:10.5pt;font-family:&quot;Tahoma&quot;,&quot;sans-serif&quot;">Until next time - happy coding!<o:p></o:p></span></p>
<p>&nbsp;</p>
