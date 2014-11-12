---
layout: post
title: GulpJS, is it worth it?
created: 1396250160
author: robert
permalink: /gulpjs-it-worth-it
tags:
- JS
- gulpjs gruntjs build-tools fez
---
<p>If you&#39;re familiar with Javascript and NodeJS, you&#39;re probably familiar with <a href="http://gruntjs.com/">Grunt</a>, and with good reason. The most commonly used build tool and task runner for JS/NodeJS projects does it&#39;s job, and does it well.&nbsp;So if everyone uses Grunt, (practically every bower module installed will have grunt as its task runner), why &nbsp;choose an alternative?<br />
<br />
My <em>personal</em> answer is code style.&nbsp;<br />
<br />
There aren&#39;t that many alternatives to Grunt. At the time of this post, the only two I have heard anything remotely interesting about are <a href="http://gulpjs.com/">GulpJS</a> and <a href="http://fez.github.io/">Fez</a>. Here, I will be explaining my choice of the former. The latter I may try in some future project, but am currently less than familiar with.</p>

<p>&nbsp;</p>

<p><span style="font-size:14px;">So GulpJS, what is it?</span></p>

<p>Like GruntJS, it&#39;s a task runner, or build tool, or whatever you wish to call it. (Automation utility?). Anyways, GulpJS has the same goal as Grunt, only it does it somewhat differently. GulpJS calls itself&nbsp;a streaming build system, which is one of the major differences between it and Grunt. Where Grunt focuses on files, GulpJS focuses on streams. In essence, Grunt tasks will keep reading files before a task begins&nbsp;and writing them back after a task finishes manipulating it. Tasks in GulpJS are pooled into an in-memory array of file&nbsp;streams, passed through from each task to the next in a &quot;pipeline&quot;, writing only the finished product (files) to their intended destination.</p>

<p>The second difference between GruntJS and GulpJS is speed. Sadly, I don&#39;t have comparable&nbsp;benchmarks as of yet, but so far, it seems to me that Gulp&nbsp;is just a wee bit faster than Grunt, probably to do with not having to write files to disk all the time. It&#39;s not a huge difference, but it <em>is</em> noticeable.&nbsp;</p>

<p>The third, and to me the most important difference between Gulp and Grunt is the code style. Grunt modules and tasks rely heavily on configuration. I like configuration, but the json for grunt configuration very quickly becomes long and cumbersome and rather unreadable. At least it does to me. Gulp tasks read like, feel like and <em>are&nbsp;</em>javascript code.&nbsp;<br />
&nbsp;</p>

<p>A task to minify some html and create an angular template cache in my project looks like this:<br />
&nbsp;</p>

<pre>
gulp.task(&#39;htmlmin&#39;, function(){
   gulp.src(&#39;./client/index.html&#39;)
       .pipe(htmlMin({quotes:true}))
       .pipe(gulp.dest(&#39;./dist/index/&#39;));

    gulp.src(&#39;./client/app/**/*.tpl.html&#39;)
       .pipe(htmlMin({quotes:true}))
       .pipe(ngTempCache({
            standalone:true
        }))
       .pipe(uglify())
       .pipe(gulp.dest(dist+ &#39;app/&#39;));
});</pre>

<p>&nbsp;</p>

<p>It&#39;s easy to read, easy to modify and quite short. Gulp tasks can also have dependency tasks, much like grunt does, so that makes it even shorter.</p>

<p>This code style is what eventually convinced me to use Gulp in my current project, and I&#39;m quite happy with my choice.</p>

<p>&nbsp;</p>

<p>I&#39;ll also note that while the plugin library for Grunt is vastly greater (2500+) than the Gulp&nbsp;plugin library (430+), the latter library probably already includes most of what you&#39;d use in most of your projects. I&#39;ve also found that Gulp plugins are of higher quality than Grunt plugins, mostly due to the Gulp&#39;s strict plugin guildlines.</p>

<p>So is GulpJS worth it? I found the answer to be a great big <strong>YES</strong>. But don&#39;t take my word for it, try it yourself and if you still don&#39;t like it, Grunt is still a very good tool.</p>

<p>&nbsp;</p>
