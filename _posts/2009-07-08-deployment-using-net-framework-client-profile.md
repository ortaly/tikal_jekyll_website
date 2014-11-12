---
layout: post
title: Deployment using .NET Framework Client Profile
created: 1247016329
permalink: deployment-using-net-framework-client-profile
tags:
- .NET
---
<p>Deployment is a mess from a developer's perspective. You almost always end up studying complex new tools you use only once, since the next time you'll need you'll need to learn a next generation (and totally different) new tool.<br />
<br />
But one problem we always try to solve: how to move only the minimum set of libraries needed in order to run our software. <br />
<br />
Until not so long ago, when deploying a .NET client, one would had to make sure that the relevant .NET framework is installed on the client's machine. If it was not, the installation package would download the .NET framework and install it. <br />
<br />
My friend <a target="_blank" href="http://www.tikalk.com/users/tamikoenig">Tami</a> tipped me about a better technique. <br />
<br />
Microsoft now allows you to build a <b>.NET Framework Client Profile</b> which is a subset of the .NET framework - a subset that contains only the relevant libraries needs to get a .NET 3.5 application up and running.<br />
<br />
Here are some references:<br />
MSDN: <a target="_blank" href="http://msdn.microsoft.com/en-us/library/cc656912.aspx">.NET Framework Client Profile</a></p>
<p>MSDN: <a target="_blank" href="http://msdn.microsoft.com/en-us/library/142dbbz4.aspx">ClickOnce Deployment Overview</a><br />
Troy Martez's Weblog: <a href="http://blogs.windowsclient.net/trickster92/archive/2008/05/21/introducing-the-net-framework-client-profile.aspx">Introducing the .NET Framework Client Profile</a><br />
Scott Hanselman's ComputerZen.com: <a target="_blank" href="http://www.hanselman.com/blog/SmallestDotNetOnTheSizeOfTheNETFramework.aspx">SmallestDotNet: On the Size of the .NET Framework</a></p>
<p>&nbsp;</p>
