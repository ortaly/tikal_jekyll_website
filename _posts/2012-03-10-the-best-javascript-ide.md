---
layout: post
title: The Best JavaScript IDE
created: 1331388726
author: menny
permalink: /best-javascript-ide
tags:
- .NET
- .Net Open Source
---
<div>Visual studio is probably the best JavaScript editor out there. This  is not a comparison test between the IDE&rsquo;s it&rsquo;s just my opinion why VS  kicks ass to others. To be completely honest</div>
<div>&nbsp;</div>
<ol>
    <li>I haven&rsquo;t testes all the IDE&rsquo;s out there</li>
    <li>I&rsquo;ve been using VS for more than 10 years</li>
    <li>I&rsquo;ve been using eclipse for a couple of month</li>
    <li>Other coworker facing my state (1, 2) also shares the same opinion.</li>
</ol>
<p>&nbsp;</p>
<div><a data-cke-saved-href="http://www.tikalk.com/incubator/blog/javascript-ide%E2%80%99s-yes" href="../../../../../../../incubator/blog/javascript-ide%E2%80%99s-yes">After reading a coworker of mine blog post about JavaScript IDE&rsquo;s</a>, I decided to give <a data-cke-saved-href="http://www.aptana.com/" href="http://www.aptana.com/">Aptana</a>  (eclipse plugin) a chance: I worked on it for more than a week building  a JavaScript application and wasn&rsquo;t impressed at all, all the features  it presented where very similar to the basic feature VS has + the  debugging experience was absent.</div>
<div>&nbsp;</div>
<div>My co-workers tried <a data-cke-saved-href="http://www.jetbrains.com/webstorm/" href="http://www.jetbrains.com/webstorm/">jet brains WebStorm</a>  and had the same feeling I had with Aptana , beside the IntelliSense  was awful, just hitting the &ldquo;.&rdquo; (dot) led to full blown list of, what  seems to be, all @#$%( JavaScript had to offer.</div>
<div>For the obvious reasons I'm not going to mention here notepads  (including sublime or notepad++). As good as they are &ndash; they are still  notepads with script highlighting.</div>
<div>&nbsp;</div>
<div><b><u>Visual Studio (10)</u></b></div>
<div>After switching to VS I could feel a cool breeze on my face and I  could breathe again easily. The first thing I wanted to do is to split  the project into libraries:</div>
<div>Consider the following tree:</div>
<ul>
    <li><font size="2">js</font>
    <ul>
        <li><font size="2">controllers</font>
        <ul>
            <li><font size="2">controller1.js</font></li>
            <li><font size="2">&hellip;</font></li>
        </ul>
        </li>
        <li><font size="2">models</font>
        <ul>
            <li><font size="2">model1.js</font></li>
            <li><font size="2">&hellip;</font></li>
        </ul>
        </li>
        <li><font size="2">views</font>
        <ul>
            <li><font size="2">view1.html</font></li>
            <li><font size="2">&hellip;</font></li>
        </ul>
        </li>
        <li><font size="2">app.js</font></li>
    </ul>
    </li>
    <li><font size="2">lib</font>
    <ul>
        <li><font size="2">jquery</font></li>
        <li><font size="2">...</font></li>
    </ul>
    </li>
    <li><font size="2">html</font>
    <ul>
        <li><font size="2">index.html</font></li>
        <li>&nbsp;</li>
    </ul>
    </li>
</ul>
<div>But as JavaScript dictates I need a way to <strong>&ldquo;compile&rdquo; all the files into one file</strong>.  I could easily write a post build event, but instead I wanted something  more light weight so I don&rsquo;t need to compile things at all, so  implemented a <a data-cke-saved-href="http://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cts=1330784648071&amp;ved=0CCwQFjAA&amp;url=http%3A%2F%2Fmsdn.microsoft.com%2Fen-us%2Flibrary%2Fbb126445.aspx&amp;ei=ZylST-SPJeWs0QXXucjWCw&amp;usg=AFQjCNE1M5JOJ8xG01yL9yoLpnIKOKQQuQ" href="http://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cts=1330784648071&amp;ved=0CCwQFjAA&amp;url=http%3A%2F%2Fmsdn.microsoft.com%2Fen-us%2Flibrary%2Fbb126445.aspx&amp;ei=ZylST-SPJeWs0QXXucjWCw&amp;usg=AFQjCNE1M5JOJ8xG01yL9yoLpnIKOKQQuQ">T4 template</a> that generated the index.html and the app.js file&ndash; <b>first step</b>.  Then with a click of a button the files get generated. I can add this  now as build event or make sure that whenever someone saves a file the  template will get generated. But still, I just wanted to get things  running in a <u>couple of minutes</u> so I stopped here. By the way, I used an empty web project as my starting point.</div>
<div>&nbsp;</div>
<div><b>The second step</b> was to integrate <a data-cke-saved-href="http://www.jslint.com/" href="http://www.jslint.com/">JSLint</a> (by <em>Douglas</em> Crockford), which already has integration suggested by the community <a data-cke-saved-href="http://jslint4vs2010.codeplex.com/" href="http://jslint4vs2010.codeplex.com/">here</a>, and also you can find it as VS Extension</div>
<div><a><img border="0" style="background-image: none; border-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px;" title="image" alt="image" data-cke-saved-src="file:///C:/Users/Onemenny/AppData/Local/Temp/WindowsLiveWriter1286139640/supfilesBB2B519/image_thumb1.png" src="/files/image.png" /></a></div>
<div>&nbsp;</div>
<div><b>The third step</b> was the <a data-cke-saved-href="http://visualstudiogallery.msdn.microsoft.com/site/search?query=javascript&amp;f%5b0%5d.Value=javascript&amp;f%5b0%5d.Type=SearchText&amp;ac=8" href="http://visualstudiogallery.msdn.microsoft.com/site/search?query=javascript&amp;f%5b0%5d.Value=javascript&amp;f%5b0%5d.Type=SearchText&amp;ac=8">Visual Studio Gallery looking for JavaScript extension</a>, there I added the <a data-cke-saved-href="http://visualstudiogallery.msdn.microsoft.com/288a2b0f-1357-47b4-8215-1134c36bdf30" href="http://visualstudiogallery.msdn.microsoft.com/288a2b0f-1357-47b4-8215-1134c36bdf30">JavaScript parser</a> which added tons of cool features like &ldquo;Tree of functions&rdquo;, &ldquo;Runtime source support&rdquo; for debug and much more.</div>
<div>&nbsp;</div>
<p><img alt="" src="/files/image1.png" /></p>
<p>&nbsp;</p>
<div>Of course you can find more great extensions, but this was enough for me to get me going.</div>
<div>&nbsp;</div>
<div><b>The forth step</b> was to debug which gave me the full power of VS  instead of just using Firebug and a browser, I could really do break  points, watches, stack, &ldquo;go to definition&rdquo; and much more without  reloading the page. FireBug (or whatever you use) is still mandatory  tool, but just for the sake of debug the IDE should be enough.</div>
<div>&nbsp;</div>
<div><b>The fifth step</b> is not a real step, the guys at Microsoft are  trying really hard to show up real IntelliSense, which is one of the  problems with dynamic coding. And about 50% of the time, if you have all  the references right and if you have been playing nice - you can get a  nice IntelliSense showing up helpful suggestions.</div>
<div>&nbsp;</div>
<div>Now, what more can you ask? Really? Well there is more in <a data-cke-saved-href="http://www.microsoft.com/visualstudio/11/en-us" href="http://www.microsoft.com/visualstudio/11/en-us">VS 2011 (in beta now)</a></div>
<ul>
    <li>Minifying and prettifying are built in (you can get these in MVC 4.0 as well)</li>
    <li>IntelliSense is automatically rebuild</li>
    <li>ECMAScript 5 support</li>
    <li>Better IntelliSense</li>
    <li>Dynamic load of script references like <a data-cke-saved-href="https://github.com/BorisMoore/JsDefer" href="https://github.com/BorisMoore/JsDefer">jsdefere</a></li>
    <li>JavaScript console built into VS</li>
    <li>And a lot more: <a data-cke-saved-href="http://blogs.msdn.com/b/webdevtools/archive/2011/09/15/new-javascript-editing-features-for-web-development-in-visual-studio-11-developer-preview.aspx" href="http://blogs.msdn.com/b/webdevtools/archive/2011/09/15/new-javascript-editing-features-for-web-development-in-visual-studio-11-developer-preview.aspx">CHECK IT HERE</a></li>
    <li>&nbsp;</li>
</ul>
<div>I know some of you are religious about their IDE or programming  language, well, don&rsquo;t be: VS has a lot more to offer than any other  JavaScript IDE out there.</div>
<div>P.S.</div>
<div>If anyone wants the T4 templates I used please leave a comment or something.</div>
<p>&nbsp;</p>
