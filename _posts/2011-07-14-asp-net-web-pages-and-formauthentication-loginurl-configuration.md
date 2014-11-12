---
layout: post
title: ASP.NET Web Pages and FormAuthentication.LoginUrl configuration
created: 1310638037
author: igorz
permalink: /net/aspnet-web-pages-and-formauthenticationloginurl-configuration
tags:
- .NET
- ASP.NET Web Pages
- ASP.NET
- .Net Open Source
---
<p>Recently I had integrated ASP.NET Web Pages into existing ASP.NET Web Forms site. It was classic Web Forms project uses most of ASP.NET Web Forms features.  And of course it uses the built-in FormAuthentication. See Web.config:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-CgU1U6yF1-4/Th6wQNRQN6I/AAAAAAAALKs/HMCvOiNBS2I/s1600/2011-07-14+11h52_18.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img width="640" height="59" border="0" alt="" src="http://1.bp.blogspot.com/-CgU1U6yF1-4/Th6wQNRQN6I/AAAAAAAALKs/HMCvOiNBS2I/s640/2011-07-14+11h52_18.png" /></a></div>
<p>Any time you access 'secure' url, you get redirected to <b><i>Login.aspx</i></b> with <b><i>ReturnUrl </i></b>parameter. This worked fine for years.</p>
<p>&nbsp;</p>
<p>There was a reason to integrate ASP.NET Web Pages into this working project. Integration itself was not painful.&nbsp; First of all I upgraded the project to ASP.NET 4 and then added following setting to enable Web Pages.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-LB_MFWMWyR8/Th6wRdyjloI/AAAAAAAALK0/PL--_qaN5ME/s1600/2011-07-14+11h57_06.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-LB_MFWMWyR8/Th6wRdyjloI/AAAAAAAALK0/PL--_qaN5ME/s1600/2011-07-14+11h57_06.png" /></a></div>
<p>My old aspx pages and new cshtml worked fine, but it broke user authentication flow in strange way. All unauthenticated requests was redirected to <b><i>/Account/Login </i></b>instead of <b><i>Login.aspx</i></b>.</p>
<p>&nbsp;</p>
<p>I was shocked!!!. Where this <b><i>/Account/Login </i></b>came from?!?!  Starting debugging I found that&nbsp; <i><b>FormAuthentication.LoginUrl</b></i>&nbsp; returns <b><i>~/Account/Login </i></b>despite configuration in Web.config. Seems someone overrides web.config settings, but why?</p>
<p>&nbsp;</p>
<p>The answer came from Reflector (this tool always helps). When I enabled ASP.NET Web Pages in the project, it forced <b>WebMatrix.WebData.dll </b>being loaded, which in its turn called <i><b>FormsAuthentication.EnableFormsAuthentication</b></i> overriding existing FormAuthentication settings.</p>
<p>&nbsp;</p>
<p>Web Pages looks for <i><b>loginUrl</b></i> app setting and use a default <b><i>~/Account/Login </i></b>if no such setting found<b><i>. </i></b>I added following setting and it solved my problem:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-5ySDuA2ziJ8/Th6wRFOUouI/AAAAAAAALKw/SmjS3_PKXvA/s1600/2011-07-14+11h56_02.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://1.bp.blogspot.com/-5ySDuA2ziJ8/Th6wRFOUouI/AAAAAAAALKw/SmjS3_PKXvA/s1600/2011-07-14+11h56_02.png" /></a></div>
<p>I think this is a bug in ASP.NET Web Pages. Configuring loginUrl with appSettings is not clear when you already have form authentication being configured in the same Web.config.</p>
<p>&nbsp;</p>
<p>(<a href="http://igorzelmanovich.blogspot.com/2011/07/aspnet-web-pages-and.html">original post</a>)</p>
