---
layout: post
title: The Best JavaScript IDE
created: 1330786620
author: menny
permalink: /best-javascript-ide
tags:
- .NET
---
<p>Visual studio is probably the best JavaScript editor out there. This is not a comparison test between the IDE’s it’s just my opinion why VS kicks ass to others. To be completely honest
<ol>
<li>I haven’t testes all the IDE’s out there
<li>I’ve been using VS for more than 10 years
<li>I’ve been using eclipse for a couple of month
<li>Other coworker facing my state (1, 2) also shares the same opinion. </li>
</ol>
<p><a href="http://www.tikalk.com/incubator/blog/javascript-ide%E2%80%99s-yes">After reading a coworker of mine blog post about JavaScript IDE’s</a>, I decided to give <a href="http://www.aptana.com/">Aptana</a> (eclipse plugin) a chance: I worked on it for more than a week building a JavaScript application and wasn’t impressed at all, all the features it presented where very similar to the basic feature VS has + the debugging experience was absent.
<p>My co-workers tried <a href="http://www.jetbrains.com/webstorm/">jet brains WebStorm</a> and had the same feeling I had with Aptana , beside the IntelliSense was awful, just hitting the “.” (dot) led to full blown list of, what seems to be, all @#$%( JavaScript had to offer.
<p>For the obvious reasons I’m not going to mention here notepads (including sublime or notepad++). As good as they are – they are still notepads with script highlighting.
<p><b><u></u></b>
<p><b><u>Visual Studio (10)</u></b>
<p>After switching to VS I could feel a cool breeze on my face and I could breathe again easily. The first thing I wanted to do is to split the project into libraries:
<p>Consider the following tree:
<ul>
<li><font size="2">js</font>
<ul>
<li><font size="2">controllers</font>
<ul>
<li><font size="2">controller1.js</font>
<li><font size="2">…</font></li>
</ul>
<li><font size="2">models</font>
<ul>
<li><font size="2">model1.js</font>
<li><font size="2">…</font></li>
</ul>
<li><font size="2">views</font>
<ul>
<li><font size="2">view1.html</font>
<li><font size="2">…</font></li>
</ul>
<li><font size="2">app.js</font></li>
</ul>
<li><font size="2">lib</font>
<ul>
<li><font size="2">jquery</font>
<li><font size="2">…</font></li>
</ul>
<li><font size="2">html</font>
<ul>
<li><font size="2">index.html</font></li>
</ul>
</li>
</ul>
<p>But as JavaScript dictates I need a way to <strong>“compile” all the files into one file</strong>. I could easily write a post build event, but instead I wanted something more light weight so I don’t need to compile things at all, so implemented a <a href="http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cts=1330784648071&ved=0CCwQFjAA&url=http%3A%2F%2Fmsdn.microsoft.com%2Fen-us%2Flibrary%2Fbb126445.aspx&ei=ZylST-SPJeWs0QXXucjWCw&usg=AFQjCNE1M5JOJ8xG01yL9yoLpnIKOKQQuQ">T4 template</a> that generated the index.html and the app.js file– <b>first step</b>. Then with a click of a button the files get generated. I can add this now as build event or make sure that whenever someone saves a file the template will get generated. But still, I just wanted to get things running in a <u>couple of minutes</u> so I stopped here. By the way, I used an empty web project as my starting point.
<p><b>The second step</b> was to integrate <a href="http://www.jslint.com/">JSLint</a> (by <em>Douglas</em> Crockford), which already has integration suggested by the community <a href="http://jslint4vs2010.codeplex.com/">here</a>, and also you can find it as VS Extension
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image_thumb.png" width="240" height="229"></a>
<p><b>The third step</b> was the <a href="http://visualstudiogallery.msdn.microsoft.com/site/search?query=javascript&f%5b0%5d.Value=javascript&f%5b0%5d.Type=SearchText&ac=8">Visual Studio Gallery looking for JavaScript extension</a>, there I added the <a href="http://visualstudiogallery.msdn.microsoft.com/288a2b0f-1357-47b4-8215-1134c36bdf30">JavaScript parser</a> which added tons of cool features like “Tree of functions”, “Runtime source support” for debug and much more.
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image1.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image_thumb1.png" width="240" height="203"></a>
<p>Of course you can find more great extensions, but this was enough for me to get me going.
<p><b>The forth step</b> was to debug which gave me the full power of VS instead of just using Firebug and a browser, I could really do break points, watches, stack, “go to definition” and much more without reloading the page. FireBug (or whatever you use) is still mandatory tool, but just for the sake of debug the IDE should be enough.
<p><b>The fifth step</b> is not a real step, the guys at Microsoft are trying really hard to show up real IntelliSense, which is one of the problems with dynamic coding. And about 50% of the time, if you have all the references right and if you have been playing nice – you can get a nice IntelliSense showing up helpful suggestions.
<p>Now, what more can you ask? Really? Well there is more in <a href="http://www.microsoft.com/visualstudio/11/en-us">VS 2011 (in beta now)</a>
<ul>
<li>Minifying and prettifying are built in (you can get these in MVC 4.0 as well)
<li>IntelliSense is automatically rebuild
<li>ECMAScript 5 support
<li>Better IntelliSense 
<li>Dynamic load of script references like <a href="https://github.com/BorisMoore/JsDefer">jsdefere</a>
<li>JavaScript console built into VS
<li>And a lot more: <a href="http://blogs.msdn.com/b/webdevtools/archive/2011/09/15/new-javascript-editing-features-for-web-development-in-visual-studio-11-developer-preview.aspx">CHECK IT HERE</a></li>
</ul>
<p>I know some of you are religious about their IDE or programming language, well, don’t be: VS has a lot more to offer than any other JavaScript IDE out there.
<p>P.S.
<p>If anyone wants the T4 templates I used please leave a comment or something.</p>
