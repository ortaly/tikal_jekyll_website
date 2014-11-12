---
layout: post
title: ASP.NET MVC 2 Client side validation using jQuery validation plug-in
created: 1274106266
author: igorz
permalink: /net/aspnet-mvc-2-client-side-validation-using-jquery-validation-plug
tags:
- .NET
- .Net Open Source
- ASP.NET MVC
- jQuery
---
<p>ASP.NET MVC 2 has validation architecture that support both server-side and client-side validation. ScottGu describes in details how to get validation works in his post <a href="http://weblogs.asp.net/scottgu/archive/2010/01/15/asp-net-mvc-2-model-validation.aspx">ASP.NET MVC 2: Model Validation.</a>  The best feature in client-side architecture is that you may use alternative java scripts validation libraries like jQuery validation.  There is a steps to get client-side validation works using jQuery validation plug-in:</p>
<ol>
    <li>Download and add to your ASP.NET MVC project following java scripts:
    <ul>
        <li><a href="http://docs.jquery.com/Downloading_jQuery">jquery-1.4.2.js</a></li>
        <li><a href="http://bassistance.de/jquery-plugins/jquery-plugin-validation/">jquery.validate.js</a></li>
        <li><a href="http://aspnet.codeplex.com/releases/view/41742">MicrosoftMvcJQueryValidation.js</a> (ASP.NET MVC 2 Futures download)</li>
    </ul>
    I assume you put all scripts into /Scripts folder of your MVC application</li>
    <li>Enable client side validation
    <ul>
        <li>add three JavaScript references to your view</li>
        <li><img src="http://lh4.ggpht.com/_XoCEelnLy98/S_FN5eg17KI/AAAAAAAAKa8/fqOyPiXhY0I/s800/scriptreferences.png" alt="" /></li>
        <li>write one line of code in the view before form</li>
        <li><img src="http://lh4.ggpht.com/_XoCEelnLy98/S_FOkQ-pAfI/AAAAAAAAKbE/mFq0O2GYDV4/s800/enableclientvalidation.png" alt="" /></li>
    </ul>
    </li>
</ol>
<p>That's it! Now you have Client-side validation using jQuery validation plug-in!</p>
