---
layout: post
title: My impression from Sails.Js
created: 1389375724
author: shavit
permalink: my-impression-from-sails-js
tags:
- JS
- sails.js
- Javascript
- mvc
- fullstack
---
<h2>Intro</h2>

<p><span style="line-height: 1.6em;">At this post I will briefly share my impressions from Sails.JS as the server-side framework I experienced with <a href="http://tikalk.com/tikals-fuseday-javascript-group-summary">at the Fuseday</a>.</span><br />
<a href="http://sailsjs.org/" style="line-height: 1.6em;">Sails.JS</a><span style="line-height: 1.6em;"> is a framework that provides a complete FullStack solution based on MVC architecture for developing web applications.</span></p>

<p><strong>I think sails is awesome, and I&#39;ll try to explain why:</strong></p>

<p>On daily basis, I work with <a href="http://expressjs.com/">Express</a> as the web framework for node. &nbsp;Express is a light abstraction on top of <a href="http://www.senchalabs.org/connect/">connect</a> that handles server requests. &nbsp;With Express I feel like fundamental things are missing. &nbsp;Usually an app (not just a service) built from data, views and logic, and with Express I feel I have to wire-up all three of them with no help from the framework. And if the app is getting bigger, maintaining it become difficult, and keeping consistency while doing so, is even harder.<br />
Sails.js is different due to its holistic approach. There are some significant things you get for free just by creating an app and lifting those sails:</p>

<ul>
	<li>The Library structure is set-up for you as you expect from an MVC approach: you get a complete separation between the Models, Views and Controllers.</li>
	<li>Sails.js fully equipped &ndash; a new app already contains: locals, i18n, socket.io, REST API, a routing mechanism for serving views and data.</li>
	<li>REST Blueprints - automatically generated JSON API for manipulating models, (You don&#39;t have to write any backend code to build simple CRUD apps).</li>
	<li>The different pieces of the app are already configured &ndash; yeah, you should <a href="http://sailsjs.org/#!documentation/configuration">read about it and understand how to change it</a>, but it is straightforward: sails contains a &quot;Config&quot; folder with&nbsp;many stuff to configure like connection to a data provider, sockets approach, policies, routes, bad requests notifications, sessions and more.</li>
	<li>Adding entities is extremely fast and easy, for example, in order to add the entity &quot;User&quot; you should type at the terminal:&nbsp;<strong>&quot;sails generate user&quot;</strong>&nbsp;This will instantly create and wire up a <a href="http://sailsjs.org/#!documentation/controllers">controller</a> name UserController.js, and a <a href="http://sailsjs.org/#!documentation/models">model</a> name User.js. &nbsp;(At the model you can sets the properties of an entity and even declare data types and validation rules).</li>
	<li>Database support &ndash; PostgreSQL, MySQL, MongoDB, Memory and Disk. Additional libraries isn&#39;t required.</li>
</ul>

<p><strong>Views:</strong></p>

<p>Sails.JS uses by default Embedded JavaScript (EJS) as the View engine, it generates the view at the server side and serve it as a page. &nbsp;Personally I don&rsquo;t like EJS, I do like that sails is flexible enough to let me change it to any View engine I desire.</p>

<p><strong>What next?</strong></p>

<p>From my short experience with Sails.js, I believe it can and should be a worthy candidate for a development framework in any future challenges. &nbsp; At the <a href="http://www.my6sense.com/">company where I work</a> we are heavily considering to migrate our server side to Sails.js ecause of the reasons I mentioned above.</p>
