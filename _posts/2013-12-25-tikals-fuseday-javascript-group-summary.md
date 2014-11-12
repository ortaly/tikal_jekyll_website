---
layout: post
title: Tikal's Fuseday - Javascript Group Summary
created: 1388004952
author: orenf
permalink: tikals-fuseday-javascript-group-summary
tags:
- JS
- fuesday
- Javascript
- nodejs
- sailsjs
- socketio
---
<h2>Introduction</h2>

<p>This year, the project for the fuseday (a day we&#39;re all experimenting new technologies) was a remote youtube controller application.&nbsp;</p>

<p>The idea is having an app which will functions as 2 clients:&nbsp;</p>

<ol>
	<li>remote controller application - html +js based - which serves as a remote for a youtube client on another machine&nbsp;</li>
	<li>screen application - which serves as the screen app (aka slave) - it will get notifications from the remote app&nbsp;</li>
</ol>

<h2>The FullStack&nbsp;</h2>

<p>As a javascript group, we chose new to experiment with rather new emerging technologies in the javascript world.&nbsp;</p>

<h3>Server Side</h3>

<p>node.js -&nbsp;we chose <a href="http://sailsjs.org">sails.js</a> - an mvc framework which runs on nodejs and inspired by ruby on rails framework. sails was rather easy to follow, and since its very well structured nature, it allowed us to work separately on modular features without interrupting each other and integrating all with ease.</p>

<p>Also, sails.js is already bundled with socket.io, structured MVC methodology wiring, built in REST api for creation and much more (if digged in).</p>

<p>we chose <a href="http://passportjs.org/">passport.js</a> for supporting social login to the app - so the app can connect its screen and remote instance to the current user and identify the relevant screens and remotes easily.</p>

<p>Along passport.js, we used the cloud based <a href="http://www.mongohq.com">mongohq</a> service for user management, and specifically, for saving the user&#39;s session.</p>

<h3>Client Side</h3>

<p>For client side we chose to experiment with the future standard of <a href="http://www.w3.org/TR/components-intro/">web components</a> implemented by Google&#39;s <a href="http://www.polymer-project.org/">Polymer.js project</a>.</p>

<p>We used Polymer for creating encapsulated custom elements (aka web components). Polymer really felt like angular&#39;s directive - and even took it to higher new levels.</p>

<p>Polymer brings good and solid methodology and a new era of development while taking into consideration good work flows such as:</p>

<ol>
	<li>easy data binding ({{bind}})</li>
	<li>template engine</li>
	<li>expressions</li>
	<li>large ready to use ui polymers elements as well as functional elements (<a href="https://github.com/Polymer/polymer-ajax/blob/master/polymer-ajax.html">polymer-ajax</a>)</li>
	<li>modular approach for creating modular components</li>
	<li>simple syntax and above all (imho) - vanilla javascript and simple api&#39;s above (jquery style api).</li>
</ol>

<h3>Frontend&nbsp;Styling and Grid layout</h3>

<p>we chose to work with zurb&#39;s <a href="http://foundation.zurb.com/">Foundation 5</a> framework plain css. The <a href="http://foundation.zurb.com/docs/">docs</a> are very resourceful, easy to follow examples and nice flat design as a starting point. One of its strongest points is the mobile first approach which is implemented nicely into its selector&#39;s api.</p>

<h3>Database</h3>

<p>we chose to work with mongodb. eventualy, we worked with a cloud base monog hosting service - <a href="http://www.mongohq.com">mongohq</a> - which was quite easy to configure with sails.js</p>

<h3>Deployment</h3>

<p>As a final note, along side grunt as a build &amp; deployment tool,&nbsp;we deployed the application to the cloude service of <a href="https://www.nodejitsu.com/">nodejitsu</a>. The deployment process is quite easy and saves many configuration steps which are done behind the scenes.</p>

<p>Eventually, the fuseday was a very productive and fun day. We learned a lot, experimented with the new technologies we chose and it still feels like <a href="http://www.meetup.com/full-stack-developer-il/events/139871112/">javascript is everywhere</a>&nbsp;- fullstack all the way.</p>

<p>This project is open sourced on <a href="https://github.com/tikalk/youtube-remote-js">tikal&#39;s github</a>&nbsp;and for 30 days (as of 25/12/2013) can be <a href="http://tikalk-youtube-remote-js.nodejitsu.com">accessed here</a>.</p>
