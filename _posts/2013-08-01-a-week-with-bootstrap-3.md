---
layout: post
title: A Week with Bootstrap 3
created: 1375341523
author: gabi
permalink: /week-bootstrap-3
tags:
- JS
- bootstrap
- html
- Mobile
- responsive
---
<p>I am a big fan of the <a href="http://getbootstrap.com/" target="_blank">Bootstrap CSS framework</a> and have been using it in various projects. <a href="http://blog.getbootstrap.com/2013/07/27/bootstrap-3-rc1/" target="_blank">Bootstrap 3 RC1 which was recently released</a> is a total rewrite of the framework.</p>
<p>The most notable feature of Bootstrap 3 is &quot;mobile-first&quot;. Bootstrap 2 did a good job with mobile devices, but the new release really brings the &quot;mobileness&quot; as an integral part of the framework. To consider the difference in the <a href="http://getbootstrap.com/css/#grid" target="_blank">grid</a> classes, let&#39;s say you have a two-column layout, which you would implement like this on Bootstrap 2:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;div class=&quot;row&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;span-6&quot;&gt; first column content &lt;/div&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;span-6&quot;&gt; second column content &lt;/div&gt;<br />
	&lt;/div&gt;</span></span></p>
<p>If you add bootstrap-responsice.css, on mobile devices these columns would get stacked and each fill the width of screen.<br />
	The equivalent in Bootstrap 3 is:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;div class=&quot;row&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;col-lg-6&quot;&gt; first column content &lt;/div&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;col-lg-6&quot;&gt; second column content &lt;/div&gt;<br />
	&lt;/div&gt;</span></span></p>
<p>But what if you want to keep two columns on mobile devices too? In this case you add &quot;col-*&quot; for handset or &quot;col-sm-*&quot; for tablet to indicate the columns should not get stacked on these devices, for example:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;div class=&quot;row&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;col-lg-6 col-6&quot;&gt; first column content &lt;/div&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;col-lg-6 col-6&quot;&gt; second column content &lt;/div&gt;<br />
	&lt;/div&gt;</span></span></p>
<p>Another thing that helps with mobile UIs are <a href="http://getbootstrap.com/components/#list-group" target="_blank">list groups</a> and <a href="http://getbootstrap.com/components/#panels" target="_blank">panels</a>. Here is a very simple example of a list group in a panel:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;div class=&quot;panel&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;panel-heading&quot;&gt; Panel Heading &lt;/div&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;ul class=&quot;list-group list-group-flush&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;li class=&quot;list-group-item&quot;&gt; First item &lt;/li&gt;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;li class=&quot;list-group-item&quot;&gt; Second item &lt;/li&gt;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;li class=&quot;list-group-item&quot;&gt; Third item &lt;/li&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;/ul&gt;<br />
	&lt;/div&gt;</span></span></p>
<p>The content of list groups items can be as simple or as complex as you need them to be.</p>
<p>An important improvement in Bootstrap 3 is the performance. Take a look at this <a href="http://www.youtube.com/watch?v=Z1IqzeA3XXg" target="_blank">demonstration by Paul Irish</a>.</p>
<p>Now for the pain point: Bootstrap 3 is not a drop-in replacement for Bootstrap 2. If you are migrating a project that uses bootstrap 2, you will need to change the markup and classes quite a bit. But there are benefits to the new markup. Let&#39;s consider a very simple form in Bootstrap 2:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;form class=&quot;form-horizontal&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;label class=&quot;control-label&quot;&gt; Label &lt;/label&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;controls&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;input type=&quot;text&quot; /&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;/div&gt;<br />
	&lt;/form&gt;</span></span></p>
<p>The label&#39;s width is constant and you can set the input&#39;s width by adding &quot;input-*&quot; or &quot;span-*&quot; classes.</p>
<p>In Bootstrap 3 you get control over the label and the inputs wrapper by adding the grid classes:</p>
<p><span style="font-size:14px;"><span style="font-family: courier new,courier,monospace;">&lt;form class=&quot;form-horizontal&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;label class=&quot;control-label col-3&quot;&gt; Label &lt;/label&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;div class=&quot;col-9&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;input type=&quot;text&quot; class=&quot;form-control&quot;/&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;/div&gt;<br />
	&lt;/form&gt;</span></span></p>
<p>For the past week I have been migrating an AngularJS application from Bootstrap 2 to Bootstrap 3. One of the main components of the application is <a href="http://angular-ui.github.io/bootstrap/" target="_blank">Bootstrap-UI</a>, which mostly works fine with Bootstrap 3.</p>
<p>My recommendation: you should definitely start playing with Bootstrap 3 whether you have an existing application or website that uses Bootstrap 2 or starting a new one, especially if you are aiming for cross-device compatibility, just be aware that a migration from Bootstrap 2 will take some work.</p>
