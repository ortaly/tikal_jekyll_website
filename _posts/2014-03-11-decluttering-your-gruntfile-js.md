---
layout: post
title: Decluttering your Gruntfile.js
created: 1394543426
author: orenf
permalink: /decluttering-your-gruntfilejs
tags:
- JS
- grunt.js
- node.js
---
<div>level: intermediate</div>

<p><a href="http://gruntjs.com/">Grunt.js</a> is a great javascript task runner. It helps you to be more productive and automate various tasks for development, testing and production. Once you get how it works, Grunt is quite easy, and like myself, you start to look for new modules to automate any task in the project you&#39;re working on.</p>

<h2>The Problem with configuring grunt</h2>

<p>Soon, after adding grunt modules, Grunt&#39;s configuration object grows and Gruntfile.js becomes a monstrous gigantic 500 lines of configuration and settings. Sure, today we can handle these kind of files with ide navigation tricks.</p>

<p>However, it is very tedious and uncomfortable to manage such a configuration file. Its quite hard to find configurations, jump between them inside the file and not possible (almost) to view 2 or more configurations side by side. More important, it is not that scalable and once you want to remove a grunt module, it becomes quite a hard task to achieve.</p>

<p><a href="https://gist.github.com/orizens/9485151">This is an example for such file: Gruntfile.js</a></p>

<p>The example of the Gruntfile.js above was generated using Yeoman, and afterwards was edited several times.</p>

<h2>The Solution - organize your Gruntfile.js</h2>

<p>While I was working on creating a build task, I&#39;ve found out that this structure of Gruntfile.js is horrible and decided to organize and declutter the file - so grunt modules can be loaded as modules.</p>

<h2>1st Step - Start from scratch</h2>

<p>First, I created an empty object and named it &quot;gruntConfig&quot;.</p>

<pre class="brush:js">
var gruntConfig = {};</pre>

<p>&nbsp;</p>

<h2>2nd Step - Divide configuration to modules</h2>

<p>I created a &quot;grunt&quot; directory on the root of my project. For each defined configuration key, I created a file with the same name of the key.</p>

<p>Each file, defined a nodejs module (CommonJS style) that exports a function. This function gets a &quot;grunt&quot; reference argument and needs to return the configuration json that I extracted from the grunt configuration object. The idea in getting the &quot;grunt&quot; object as an argument is to have access to any grunt configuration properties, if needed. i.e. - for the less module i created <a href="https://gist.github.com/orizens/9485171">&quot;grunt/less.js&quot;</a>.</p>

<h2>3rd Step - loading the external configurations</h2>

<p>There are ready <a href="http://gruntjs.com/plugins">grunt plugins</a> in the npm registry that can load the external configuration and initialize the configuration. However, some didn&#39;t worked out for me and i needed a way to load selected configurations. It turned to be quite an easy and small code to write, so I ended up writing a code that requires each module (the ones I need) and adds each configuration ot the gruntConfig I created in step 1 (that&#39;s how naming each file as the key comes in handy).</p>

<p><a href="https://gist.github.com/orizens/9488045">This is the code that loads the external grunt configuration files</a></p>

<p>Then, I initialized grunt with:</p>

<pre class="brush:js">
grunt.initConfig(gruntConfig);</pre>

<p>&nbsp;</p>

<h2>Conclusion - Enlightenment</h2>

<p>Ever since cleaning the Gruntfile.js and organizing it in such a way, made it quite easy to add and testing new modules, removing unused modules and finding and configuring each one with ease.</p>
