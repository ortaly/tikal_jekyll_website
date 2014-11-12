---
layout: post
title: 10 hours = desktop and mobile app for YouTube remote controller (hackathon)
created: 1388264042
author: menny
permalink: 10-hours-desktop-and-mobile-app-for-youtube-remote-controller-hackathon
tags:
- .NET
- Android
- AngularJS
- bootstrap
- Foundation
- Javascript
- knockout
- mvc
- Nugget
- SignalR
---
<div class="entry-content">
<p>The stack:</p>

<ul>
	<li>Angular JS</li>
	<li>SignalR</li>
	<li>MVC 5</li>
	<li>VS 2013</li>
	<li>MongoDB</li>
	<li>Zurb Foundation 5.0</li>
	<li>Android Client</li>
</ul>

<p>The Mission:</p>

<ul>
	<li>Create a remote you tube player (android device like TV, tablet)that is controlled from a web site</li>
</ul>

<p>Scope</p>

<ul>
	<li>1 day (10 hours)</li>
	<li>2 teams: .NET (my team) and Android</li>
</ul>

<p>Repository</p>

<ul>
	<li><a href="https://github.com/tikalk/.NetDec13FuseDay_MediaCenter">https://github.com/tikalk/.NetDec13FuseDay_MediaCenter</a></li>
</ul>

<h1>Nugget the <font color="#00ff00">good</font> parts</h1>

<p>Since we already had a fair experience with SignalR, Mongo and of course MVC the wiring was pretty easy. Installing nugget packages for signalR, Mongo and Unity gave us a quick head start setting a repository pattern for mongo and simple hub for signalR</p>

<h1>Nugget the <font color="#ff0000">bad </font>parts</h1>

<p><strong><u>Too many flavors for each package: </u></strong>Finding the right packages is hell and feels like sending your hand to find a Coca-Cola bottle inside a bucket full of beers. Many packages have 3-5 (in a good day) flavors, and cause much confusion and web-searching&hellip; it seems like that most of the vendors has more than one flavor for the same package. This is just wrong; instead of a simple description and single packages the confusion is vast. In most cases you find yourself creating a side projects just to see what the packages gives you and what the difference from other flavors is. For instance &ldquo;Unity boostrapper for ASP.NET Web API&rdquo; and &ldquo;Unity boostrapper for ASP.NET MVC&rdquo; &ndash; now, what if you are using both in your MVC project &ndash; this is just wrong.</p>

<p><u><strong>No option to set package location: </strong></u>there is no option to set where each package files should be installed, it just sets the files where ever the<a href="http://nuget.codeplex.com/workitem/215"> package creator thought they should be</a> &ndash; again, this is just wrong since there is a very simple solution for this.</p>

<h1>Angular JS the <font color="#00ff00">good</font> parts</h1>

<p><u><strong>Organizing the project: </strong></u>Getting started with angular was quite easy, all though you need to read at least the entire tutorial before you can get started with it. I liked that it organizes your project pretty good and does not leave you room to think how and where to place every file.</p>

<p>You can chose from <a href="http://www.johnpapa.net/structuring-an-angular-project/">feature base to component base organization</a>, and since I&rsquo;m coming from the WPF world &ndash; feature base it is.</p>

<p><u><strong>Scopes: </strong></u>scopes are pretty cool, since they act as your view mode. <a href="https://plus.google.com/+AngularJS/posts/aZNVhj355G2">Although angular is more of an MVC and lacks the good parts of a true mvvm FW, it&rsquo;s still pretty easy to get along</a>.</p>

<h1>Angular JS the <font color="#ff0000">bad</font> parts</h1>

<p><u><strong>Bindings: </strong></u>I wish angular was more like knockout, but I get it the google guys wanted to keep their fields clean without having to declare each field as observable and turning them into functions. Still the binding and the digest model can become very heavy, and the need for $apply is just cumbersome. Especially<b> </b>when<b> </b>working with YouTube API (or any external PAI for that matter) you get to call $apply a lot, and that&rsquo;s just wrong (againJ)</p>

<p><u><strong>Service, Factory, and Provider: </strong></u>the difference between<b> </b>provider and factory is pretty clear. The difference between factory and service is not clear at all. If one of Tikal&rsquo;s gurus wouldn&rsquo;t explain that services provide a contractor and factory just return a singleton instance I wouldn&rsquo;t have understand it till today. Still it&rsquo;s not that clear to me.</p>

<p>Moreover I think that the naming (service, provider, factory) are much the same in the plane kind of way that most programmers get them. Really: what is the difference between a provider and a service? Doesn&rsquo;t a service provide data?</p>

<h1>Zurb Foundation the <font color="#80ff00">good</font> parts</h1>

<p><strong><u>Mobile first:</u> </strong>although bootstrap 3 is mobile first by nature it seems<b> </b>to me that bootstrap is not 100% that way and I&rsquo;m still not sure the EM vs Pixels are well implemented. It was very easy to get started and the documentation is a breeze</p>

<h1>Zurb Foundation the <font color="#ff0000">bad</font> parts</h1>

<p><u><strong>Templates: </strong></u>there<b> </b>are no templates for foundation, not even close to what <a href="https://wrapbootstrap.com/">bootstrap has to offer</a></p>

<h1>Android Clients integration</h1>

<p>Now, this is the interesting part. I thought it&rsquo;s going to be real hard to do the integration but it was rather simple. The android app implemented a native player since playing using HTML5 and the browsers is not that recommended. Even google pass you to the YouTube app from the browser when you want to play a movie.</p>

<p>So the deal was to build <strong>a hybrid app</strong>, one that displays a native player surrounded with HTML content. This seems like a good future for the app development echo system. Where you can focus on HTML for compatibility between OS&rsquo;s and leaves the hard parts for the native OS to do.</p>

<p>The basic idea was that the app will consume a SignalR service and implement the SignalR proxy for every method. We wasn&rsquo;t sure that the android app can implement JS method at runtime and we finally came up with a different approach:</p>

<div class="csharpcode">
<pre>
<span class="lnum">   1:  </span>ytRemotePlayerApp.controller(<span class="str">&#39;PlayerCtrl&#39;</span>, [<span class="str">&#39;$scope&#39;</span>, <span class="str">&#39;$http&#39;</span>, <span class="str">&#39;$rootScope&#39;</span>, <span class="str">&#39;remotePlayerService&#39;</span>,</pre>

<pre>
<span class="lnum">   2:  </span>  <span class="kwrd">function</span> ($scope, $http, $rootScope, remotePlayerService) {</pre>

<pre>
<span class="lnum">   3:  </span>&nbsp;</pre>

<pre>
<span class="lnum">   4:  </span>      <span class="kwrd">var</span> client = remotePlayerService.getClientProxy();</pre>

<pre>
<span class="lnum">   5:  </span>      <span class="kwrd">var</span> playingVideoId;</pre>

<pre>
<span class="lnum">   6:  </span>&nbsp;</pre>

<pre>
<span class="lnum">   7:  </span>      client.receivePlayCommand = <span class="kwrd">function</span> (videoId) {</pre>

<pre>
<span class="lnum">   8:  </span>          console.log(<span class="str">&#39;receivePlayCommand &#39;</span> + videoId);</pre>

<pre>
<span class="lnum">   9:  </span>&nbsp;</pre>

<pre>
<span class="lnum">  10:  </span>          <span class="kwrd">if</span> (window.JBridge) {</pre>

<pre>
<span class="lnum">  11:  </span>              <span class="kwrd">if</span> (videoId == playingVideoId) {</pre>

<pre>
<span class="lnum">  12:  </span>                  window.JBridge.play();</pre>

<pre>
<span class="lnum">  13:  </span>              } <span class="kwrd">else</span> {</pre>

<pre>
<span class="lnum">  14:  </span>                  playingVideoId = videoId;</pre>

<pre>
<span class="lnum">  15:  </span>                  window.JBridge.start(videoId);</pre>

<pre>
<span class="lnum">  16:  </span>              }</pre>

<pre>
<span class="lnum">  17:  </span>          }</pre>

<pre>
<span class="lnum">  18:  </span>      };</pre>

<pre>
<span class="lnum">  19:  </span>&nbsp;</pre>

<pre>
<span class="lnum">  20:  </span>      client.receivePauseCommand = <span class="kwrd">function</span> (videoId) {</pre>

<pre>
<span class="lnum">  21:  </span>          console.log(<span class="str">&#39;receivePauseCommand &#39;</span> + videoId);</pre>

<pre>
<span class="lnum">  22:  </span>&nbsp;</pre>

<pre>
<span class="lnum">  23:  </span>          <span class="kwrd">if</span> (window.JBridge) {</pre>

<pre>
<span class="lnum">  24:  </span>              window.JBridge.pause();</pre>

<pre>
<span class="lnum">  25:  </span>          }</pre>

<pre>
<span class="lnum">  26:  </span>      };</pre>

<pre>
<span class="lnum">  27:  </span>      </pre>

<pre>
<span class="lnum">  28:  </span>  }]);</pre>
</div>

<p>Notice that we look for the window.JBridge which is pushed to the page by the android app. So the desktop version is not prone to errors and once the bridge is alive we can call methods that where implemented on via the bridge.</p>

<p>So combining SignalR and android was easy. See the <a href="https://github.com/tikalk/.NetDec13FuseDay_MediaCenter">repo</a> for more details &ndash; the master mind behind this is <a href="http://www.linkedin.com/pub/michael-hantler/4/55/885">Michael</a> who came up with this setup.</p>

<h1>Mockups</h1>

<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/12/Untitled.png"><img alt="mockups" border="0" height="300" src="http://www.onemenny.com/blog/wp-content/uploads/2013/12/550x300xUntitled_thumb.png.pagespeed.ic.uN6VSmZ2-L.png" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" title="mockups" width="550" /></a></p>

<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2013/12/Untitled2.png"><img alt="mockups" border="0" height="308" src="http://www.onemenny.com/blog/wp-content/uploads/2013/12/549x308xUntitled2_thumb.png.pagespeed.ic.lR3G2wCC69.png" style="border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; display: inline" title="mockups" width="549" /></a></p>
</div>
