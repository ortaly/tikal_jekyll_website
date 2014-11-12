---
layout: post
title: Fuse Day 2013 - LiveCast v0.2
created: 1373447994
author: assafg
permalink: /fuse-day-2013-livecast-v02
tags:
- JS
- Javascript
- node.js
- node.js CoffeeScript
- nosql
---
<p>Our goal, in the Javascript group, for this Fuse Day was to get our hands dirty with a bunch of javascript technologies for end-to-end application development. The application is a remote teaching &amp; presentation tool where a single &quot;session owner&quot; shares a code editor, canvas, presentation and more with other connected peers (i.e.. students). Our first run at this project during the previous fuse day focused on utilizing Web RTC (Real Time Communication) so the session owner and students could see each other. For this Fuse Day we decided to start from scratch so we can focus on the the current technologies instead of fixing old bugs.</p>
<p>We divided the project to 3 sub projects: Server, Client, UI/UX</p>
<h3>
	Server&nbsp;</h3>
<p>The server is responsible for authenticating the users, delegating the messages between the peers and storing session information. We used the following NodeJS based Technologies and frameworks:</p>
<ul>
	<li>
		<a href="https://github.com/c9/architect">Architect </a>- a framework to keep the different modules structured and loosely coupled.</li>
	<li>
		<a href="http://socket.io/">Socket.IO</a>&nbsp;- a framework for real time socket based client-server-client communication</li>
</ul>
<p>To keep the server scalable we avoided from saving any state information in memory - so we threw a <a href="http://redis.io/">Redis</a>&nbsp;server into the mix. Redis was chosen for it&#39;s speed and simplicity.</p>
<h3>
	Client</h3>
<p>The client is a single page application. As mentioned, it uses <a href="http://angularjs.org/">AngularJS</a>&nbsp;as it&#39;s MV* framework.</p>
<h3>
	UI/UX</h3>
<p>The UI/UX part was to define and apply the applications layout and styling. We used basic Bootstrap styles. In the future we will want to use AngularUI for the styling.</p>
<p>&nbsp;</p>
<h2>
	Other Stuff Worth Mentioning</h2>
<h3>
	Grunt</h3>
<p>We also wanted to get a taste of modern development and deployment processes so we used Grunt as a basis for the development/build/deployment tool. We started off with a pretty thorough <a href="https://github.com/kamiyam/grunt-init-express">boiler-plate</a>.&nbsp;</p>
<h3>
	Tests</h3>
<p>On the server side we used Jasmine-Node run by Grunt with the <a href="https://github.com/jasmine-contrib/grunt-jasmine-node">grunt-jasmine-node</a> plugin.</p>
<p>&nbsp;</p>
<h2>
	Conclusion</h2>
<p>The fused Day was very productive and we all got a chance to get a lot of real experience with relatively cutting edge technologies and frameworks. Our project is not yet complete but we have plenty to work with in the near future.</p>
<p>The project is stored @&nbsp;<a href="https://github.com/tikalk/LiveCast">https://github.com/tikalk/LiveCast</a></p>
<h2>
	&nbsp;</h2>
<p>&nbsp;</p>
