---
layout: post
title: Pointless.js (Better) Explained
created: 1364154622
author: adi
permalink: /js/pointlessjs-better-explained
tags:
- JS
- backbone.js
---
<p><span style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">In my previous post about Backbone I chose not to go into details. Apparently, even though appreciated, the bottom line wasn&rsquo;t enough. People expect explanations...</span></p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">So I decided to write another post that better explains why I think Backbone should be avoided as infrastructure for web applications (not web sites). However, since I didn&rsquo;t want to waste too much time on this, I only included the highlights.</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">The most important thing to realize about Backbone is that it&rsquo;s not really an infrastructure but more of a tool for developing infrastructures (not a very good one too). It&nbsp;heavily&nbsp;depends on external code, which is very annoying because&nbsp;one of the things that I expect from an infrastructure is to provide functionality that covers all major of aspects of the kind of applications it is intended for, without&nbsp;loosely&nbsp;depending on additional libraries.&nbsp;<br />
	<br />
	It doesn&#39;t mean that every bit of functionality needs to be developed from scratch by the framework&#39;s developers. Using 3rd party libraries is more than fair, however, if this is the case, then the least the framework could do is to bundle everything together instead of sending its users on a search and pick mission. Take a look at the following code snippets that demonstrate the minimal requirements for writing a serious application with AngularJS, Knockout, and &nbsp;Backbone:</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;"><br />
	<strong>AngularJS</strong></p>
<pre class="theme:github font-size-enable:true nums:false lang:js decode:true" style="font-size: 10px; line-height: 18px; min-height: 1.5em; color: rgb(51, 51, 51); font-family: 'Courier 10 Pitch', Courier, monospace !important; background-color: rgb(244, 244, 244) !important; border: 1px solid rgb(204, 204, 204) !important; margin-bottom: 1.5em !important; padding: 0.3em 0.5em !important;">
&lt;script type=&#39;text/javascript&#39; src=&#39;angular.js&#39;&gt;&lt;/script&gt;</pre>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;"><br />
	<strong>Knockout</strong></p>
<pre class="theme:github font-size-enable:true nums:false lang:js decode:true" style="font-size: 10px; line-height: 18px; min-height: 1.5em; color: rgb(51, 51, 51); font-family: 'Courier 10 Pitch', Courier, monospace !important; background-color: rgb(244, 244, 244) !important; border: 1px solid rgb(204, 204, 204) !important; margin-bottom: 1.5em !important; padding: 0.3em 0.5em !important;">
&lt;script type=&#39;text/javascript&#39; src=&#39;knockout.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; data-main=&#39;main/js&#39; src=&#39;require.js&#39;&gt;&lt;/script&gt;</pre>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;"><br />
	<strong>Backbone</strong></p>
<pre class="theme:github font-size-enable:true nums:false lang:default decode:true" style="font-size: 10px; line-height: 18px; min-height: 1.5em; color: rgb(51, 51, 51); font-family: 'Courier 10 Pitch', Courier, monospace !important; background-color: rgb(244, 244, 244) !important; border: 1px solid rgb(204, 204, 204) !important; margin-bottom: 1.5em !important; padding: 0.3em 0.5em !important;">
&lt;script type=&#39;text/javascript&#39; src=&#39;jquery.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;underscore.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;backbone.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;backbone.baysitter.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;backbone.nested.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;backbone.validation.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; src=&#39;marionette.js&#39;&gt;&lt;/script&gt;
&lt;script type=&#39;text/javascript&#39; data-main=&#39;main/js&#39; src=&#39;require.js&#39;&gt;&lt;/script&gt;</pre>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">&nbsp;</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">These three example roughly represent the dependencies required for each of the frameworks to provide a decent starting point (I dropped a few of Backbone&rsquo;s dependencies because these are enough to prove the point). You can imagine how tasks like upgrades and licenses management look like. Every little task becomes an involved operation... This is, BTW, one of the reasons why Backbone is so small (in terms of file size).</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">Another reason is that the development team will be doing a lot of infrastructural work.<br />
	That&#39;s right! Getting anywhere with Backbone means writing a lot of code.</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">For example, while other frameworks handle data binding (one of the most fundamental and repeatable tasks), Backbone leaves this task for its users.<br />
	The same is true for data validation, where Backbone goes as far as providing a placeholder for validation code but leaves the work for developers while other frameworks provide a declarative way of enforcing data validity.</p>
<p dir="ltr" style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">Writing all of this code isn&rsquo;t something you want to do because, aside for having a lot of code being &nbsp;downloaded to the browser, you&rsquo;re going to have a considerable amount of testing, debugging and maintenance to take care of.</p>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">Add to all of this the fact that there&#39;s no clear separation of concerns between framework components and you already have enough to keep you away.</p>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">Backbone is a frustrating framework. It is too&nbsp;minimalistic&nbsp;and often requires external solutions that add missing functionality or fix an existing one (like when the backend isn&#39;t restful).&nbsp;</p>
<p style="color: rgb(51, 51, 51); font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">&nbsp;</p>
