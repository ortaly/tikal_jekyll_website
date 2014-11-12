---
layout: post
title: Flash Builder 4 – My impressions
created: 1263719418
author: sefi
permalink: /js/flash-builder-4-–-my-impressions
tags:
- JS
- flex
- flash builder 4
---
<div class="snap_preview">
<p>I have been using the Flash Builder 4 (TM) for a few months now, and besides what you can read <a href="http://www.adobe.com/devnet/flex/articles/flashbuilder4_whatsnew.html" target="_blank">here</a>, below are my impressions:</p>
<ol>
    <li><strong>Code completion</strong> &ndash; While this is nothing new, I did find a small improvement there that I missed. Suppose you start creating a new instance, you start typing &ldquo;var myInstance:MyClass&nbsp; = new MyClass()&rdquo;. New in this version, after you type new &ndash; MyClass will be the first in the list, just press enter and you&rsquo;re set. Sweet!<br />
    You can now type MC (camel case capitals) and press cntl-space for the code complete to kick in and replace it with MyClass &ndash; even sweeter!</li>
    <li><strong>Code generation</strong> &ndash; Long awaited but still a bit limited, currently only getter/setter generation is available, and a bit limited. It&rsquo;s nothing you couldn&rsquo;t do with code snippets view.</li>
    <li><strong>Help</strong> &ndash; When using the help, it always display the help for Flex 4 SDK, even if your project is currently using SDK 3.4.1. I would have preferred it to include both or provide means to choose which to see. Not a big issue, of course, since everything is available online.</li>
    <li><strong>Conditional breakpoints</strong> &ndash; Long awaited (at least by me) this is a real treat, and works remarkably well.</li>
    <li><strong>Refactoring</strong> &ndash; Still leaves a lot to be desired, it started bad in Flex Builder 3 and improved only slightly. When using Flex Builder 3, refactoring took forever and was in all practices almost useless. This improved a little bit with Flash Builder 4. Flash Builder 4 also introduces the &lsquo;Move&rsquo; refactoring, which works OK for mxml but when moving AS files it doesn&rsquo;t even change the AS class package.</li>
    <li><strong>Profiler</strong> &ndash; Object references report was added &ndash; which greatly improves the ability to locate leaks</li>
    <li><strong>Call Hierarchy</strong> &ndash; Some things you don&rsquo;t know how much you missed until you have them again. This is one of those things. a real treat!</li>
    <li><strong>Network monitoring and Flex Unit</strong> &ndash; With the network monitor you can see the network traffic between the client and the server from within Flash Builder. It also supports integration with Flex Unit to streamline tests creation and execution.</li>
</ol>
<p>Also, please note that the Start Page has a lot of information, tutorials, videos and sample code &ndash; Good stuff.</p>
<p>Those who had the chance to work with Eclipse coding Java, know that while FB4 is a big step from FB3, there is still a lot to be achieved but it is evident that a lot of work has been done and that Adobe is committed to make FB product line something spectacular!</p>
</div>
