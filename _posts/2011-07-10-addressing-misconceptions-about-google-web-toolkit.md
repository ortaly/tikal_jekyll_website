---
layout: post
title: Addressing Misconceptions about Google Web Toolkit
created: 1310278412
author: gabi
permalink: /java/addressing-misconceptions-about-google-web-toolkit
tags:
- JAVA
- MVP
- gwt
---
<p>It appears that many people, including decision makers, are not fully aware of important GWT abilities and limitations. Many features in recent releases of GWT and related projects can be real game changers for the developers and for the end users. Here I am going to address common misconceptions and provide solutions to common issues.</p>
<p>&nbsp;</p>
<p><strong>&quot;GWT&nbsp;does not support browser history (back button, bookmarkable URLs)&quot;</strong></p>
<p>That was never true, though in earlier versions of GWT this was not so easy to manage. GWT provides access to the browser history using static methods in its History class, which is sort of fine for small applications. In GWT 2.1, <a href="http://code.google.com/webtoolkit/doc/latest/DevGuideMvpActivitiesAndPlaces.html">Activities and Places</a> were introduced, letting you programatically associate history tokens with your activities. A cleaner solution in my opinion is provided by the <a href="http://code.google.com/p/gwt-platform/">GWT-Platform</a> project - an MVP framework which, among other things, lets you use annotations to associate URL&nbsp;tokens with your presenter, and also lets you easily create and parse URL&nbsp;tokens with parameters.</p>
<p>&nbsp;</p>
<p><strong>&quot;A large GWT&nbsp;application would take a long time to download, so we would be better off using HTML pages&quot;</strong></p>
<p>A large GWT&nbsp;application does not mean long initial loading time. GWT&nbsp;2.0 introduced <a href="http://code.google.com/webtoolkit/doc/latest/DevGuideCodeSplitting.html">code splitting</a>,&nbsp;which lets you decde which code should go into the initial JavaScript segment that the user downloads (and other segments as well), letting you optimize the initial loading. The mechanism provided by GWT requires you to make an asynchronous call where you want to split the segments. A much nicer way is provided by <a href="http://code.google.com/p/gwt-platform/">GWT-Platform</a> - it lets you use annotations to mark a presenter as a code segment, or bundle together several presenters in a bundle which will compose the segment. Regardless of the abstraction you use for code splitting, you must check that you get the results you intended using the <a href="http://code.google.com/webtoolkit/doc/latest/DevGuideCompileReport.html">compiler reports</a>.</p>
<p>&nbsp;</p>
<p><strong>&quot;Any Java developer can write GWT&nbsp;code with no knowledge of HTML/CSS/JavaScript&quot;</strong></p>
<p>Not true and most likely would get you much worse results than plain HTML/CSS/JavaScript. When you write a web application you have to understand web technologies. If you use code to set the look and feel instead of CSS, you would end up with a huge hard to maintain Java code instead of a few lines of CSS. If you use widgets for everything instead of HTML panels you would consume a lot of memory and could possible make the application slower and even crash. It's also possible that a JavaScript library with your desired functionality already exists, and wrapping it with GWT is better than implementing it from scratch. Learn web technologies!</p>
<p>&nbsp;</p>
<p><strong>&quot;GWT is awsome! I will use it for every web project&quot;</strong></p>
<p>GWT IS awsome, but it's not ideal for every situation. If all you need is to display some static content, or just need some simple JavaScript functionality (client-side form validation for example), using GWT is an overkill, and you would probably not benefit from its advantages as much.</p>
<p>&nbsp;</p>
<p><strong>&quot;GWT&nbsp;is not crawlable&quot;</strong></p>
<p>As Ajax applications become more popular, the need came for search engines to be able to crawl them, even if they are a single-page site. To make your application crawlable, its history tokens should start with &quot;!&quot;, <a href="http://code.google.com/web/ajaxcrawling/docs/getting-started.html">as described here</a>.</p>
<p>&nbsp;</p>
<p>As you see, many of the concerns that were true in the past have been addressed over time. Whenever you think something is missing in GWT you should google for it, most likely there is a solution in GWT&nbsp;or a third-party library.</p>
