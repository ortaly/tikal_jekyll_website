---
layout: post
title: Decluttering Your Web Application Using angular.js & grunt.js – Part 1
created: 1400617516
author: orenf
permalink: decluttering-your-web-application-using-angular-js-and-grunt-js-part-1
tags:
- JS
- AngularJS
- architecture
- gruntjs
- less
- directives
---
<p>Excerpt:</p>

<p>Developing a well structured application wasn&rsquo;t so straight forward for me when I started. Sure, using&nbsp;<a href="http://backbonejs.com/" target="_blank" title="Backbone.js">Backbone.js</a>,&nbsp;<a href="https://angularjs.org/" target="_blank" title="Angular.js">angular.js</a>,&nbsp;<a href="http://requirejs.org/" target="_blank" title="Require.js">require.js</a>&nbsp;contributed some benefits. Overtime, I stepped into automation with grunt.js. I discovered the true beauty in structuring and organizing any code base to be modular enough &ndash; so both development &amp; production will fit to my coding lifestyle.</p>

<p>In this first post, I want to share few concepts I use in my daily client development (currently, angular.js):</p>

<ol>
	<li>organizing files and folders</li>
	<li>automated work flow for working with less</li>
	<li>keeping html files templates for directives as separated files as prepare it for production</li>
</ol>
