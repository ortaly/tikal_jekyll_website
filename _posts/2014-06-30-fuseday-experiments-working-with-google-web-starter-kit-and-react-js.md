---
layout: post
title: Fuseday Experiments - working with Google Web Starter Kit & React.js
created: 1404157850
author: orenf
permalink: fuseday-experiments-working-with-google-web-starter-kit-and-react-js
tags:
- JS
- react.js
- Fuseday
- google web starter kit
- gulp.js
---
<p>In Tikal, we are conducting 2 times a year something called &quot;Fuseday&quot; - a day where we choose some technologies to experiment with while building a small application. In this post, i&#39;de like to share my group&#39;s focus on Google&#39;s Web Starter Kit - it&#39;s pros and cons.</p>

<h2>The Application</h2>

<p>The app we were supposed to develop supposed to get a stream of tweets from an api call, and present them in a nice UI in the browser. We had to integrate some graphs and charts as well as an interactive UI to play with the data. My team managed to fulfill some of the requirements during this day.</p>

<h2>The Chosen Technologies</h2>

<p>On the client side, we chose to experiment with new or trending libraries/frameworks. We chose the following:</p>

<ol>
	<li>React.js - as a growing trend for performance in rendering web pages in the client - we feel that we had to test the workflow with React.js.</li>
	<li>Gulp.js - Gulp is trending to replace grunt.js as a node.js based task runner / automation tool.</li>
	<li>d3 - mvd3 - we feel that d3 is high in trends - so in order to take the high level of d3, we chose mvd3 as a subset of d3 in order to create pie and line charts.</li>
	<li>Google Web Starter Kit - with v2 released just 6 days ago,&nbsp;while in beta, we decided it can be quite refreshing to step out of the bootstrap world and experiment with a new set of css front end framework.</li>
</ol>

<h2>Google Web Starter Kit</h2>

<p>After briefly reading the introduction page, I downloaded the zip file - which contained the following:</p>

<ol>
	<li>2 html templates for starting a project</li>
	<li>A ready to use gulpfile with configuration for running builds, server task and more</li>
	<li>a style guide directory - which includes a demonstration of the various ui elements included in this kit</li>
	<li>sass source files - for tweaking the settings of the ui elements in order to create a different &quot;skin&quot;</li>
</ol>

<p>as a foot note - after reading carefully the <a href="https://developers.google.com/web/fundamentals/tools/">documentation of this kit</a>, I discovered that you can clone the <a href="https://github.com/google/web-starter-kit">repo of this kit</a> and follow a more&nbsp;organized procedure in order to get started.</p>

<h3>&nbsp;</h3>

<h3>Style Guide</h3>

<p>This directory includes an index.html file which outlines the various features this kit offers. There are many examples of what can be used form this kit:</p>

<ul>
	<li>Typography</li>
	<li>Buttons</li>
	<li>Lists</li>
	<li>Links</li>
	<li>Icons</li>
	<li>Breadcrumbs</li>
	<li>Table</li>
	<li>Grid</li>
	<li>Colors</li>
	<li>Highlights</li>
	<li>Editorial header</li>
	<li>Article section</li>
	<li>Guides section</li>
	<li>Page header</li>
	<li>Quote</li>
	<li>Featured icons</li>
	<li>Featured spotlight</li>
	<li>Featured list</li>
	<li>Featured block</li>
	<li>Article navigation</li>
</ul>

<p>The css classes definitions follows the nice BEM concept - while keeping the semantics of the&nbsp;classes easy to follow and grasp (in this short day). Overall, Google&#39;s Kit is minimal, both in style and in features - however, I can see how it can be nicely integrated with web components to create more UI element and complete reusable modules. It's built in media queries for various devices view ports and it's built in navigation and sidebar menu are awesome.</p>

<h2>React.js</h2>

<p>Starting to code with react.js was a challenge. I did find the tutorial on their website quite easy easy to follow. Still, the syntax feels a little bit awkward, but the overall concept may free your mind and lead you to think - component style. I do see the benefit gained from using react in large scale app like facebook, however - one has to design his component slowly as well as understand and getting to know react.js deeper. The data binding feature (let it be &quot;state&quot; - future binding - or &quot;props&quot;) works as expected. I was missing the good old html templating integration in react. Also, the use of almost html syntax inside javascript did led to confusion when you need to add attributes - and you need to start thinking again in js terms. i.e, if you need to add the attribute of a class to an &quot;html&quot; template in a react component, you would have to address it as &quot;className&quot; (as in pure javascript).</p>

<h2>Gulp.js</h2>

<p>Although gulp.js was intended to be investigated, we didn&#39;t quite reach it too much. We used it mostly for local server solution rather than its build task - which was broken (on Mac). Overall, it&#39;s &quot;watch&quot; task and live reload worked as expected and with any code change, the browser refreshed automatically.</p>

<p>You can find the <a href="https://github.com/orizens/fuse-jun14-loitfos-client" target="_blank">sources and code for the POC at github</a>.</p>
