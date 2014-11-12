---
layout: post
title: Getting Started with Reactive Extensions (part 1)
created: 1341771896
author: menny
permalink: /getting-started-reactive-extensions-part-1
tags:
- .NET
---
<p>This is the forth and final post in the series about RX
<ul>
<li>part 1 – Intro
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-2/">part 2 – Mouse Events</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-3/">part 3 – Complex Collection Events</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-4/">part 4 – Client Server Async</a></li>
</ul>
<p>The following presentation is just a kick start overview (I did @ IL alt.net session), following right after with detailed code on my next post. </p>
<h1>What is RX</h1>
<p>In computing, reactive programming is a programming paradigm oriented around data flows and the propagation of change. (<a href="http://en.wikipedia.org/wiki/Reactive_programming">wikipedia</a>)<br />
<h1>RX is…</h1>
<ol>
<li>A set of types representing asynchronous data streams
<li>A set of operators to query asynchronous data streams
<li>A set of types to parameterize concurrency</li>
</ol>
<p>RX = Observables + LINQ + Schedulers<br />
<h1>Supported Platforms</h1>
<ul>
<li>.Net 3.5 / 4 (WPF)
<li>Silverlight 4 / 5
<li>WP7
<li>XNA (XBOX)
<li>JavaScript (RxJs)</li>
</ul>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb.png" width="525" height="393"></a></p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image1.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb1.png" width="526" height="396"></a></p>
<h1><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image2.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb2.png" width="526" height="400"></a></h1>
<h1><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image3.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb3.png" width="527" height="401"></a></h1>
<h1><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image4.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb4.png" width="525" height="390"></a></h1>
<h1><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image5.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb5.png" width="525" height="393"></a></h1>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image6.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb6.png" width="526" height="387"></a></p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image7.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb7.png" width="525" height="386"></a></p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image8.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb8.png" width="526" height="400"></a></p>
<h1>RX Installation</h1>
<p><iframe style="width: 512px; height: 288px" src="http://channel9.msdn.com/Blogs/Charles/Getting-Started-with-Rx-Extensions-for-NET/player?w=512&h=288" frameborder="0" scrolling="no"></iframe>
<p> </p>
<h1>Rx Design Guide Lines </h1>
<p><a href="http://go.microsoft.com/fwlink/?LinkID=205219">here (well composed PDF)</a> </p>
<h1>Code right on</h1>
<p>next post</p>
