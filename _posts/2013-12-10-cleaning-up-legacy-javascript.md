---
layout: post
title: Cleaning up legacy Javascript
created: 1386656256
author: adam
permalink: cleaning-up-legacy-javascript
tags:
- JS
- jshint legacy
---
<h1>Cleaning up legacy JavaScript</h1>

<p>Recently I had the occasion to do some refactoring on the Javascript in our client&#39;s project. The main instigation for doing this now was that we wanted to concatenate and minify the various Javascript files (instead of 10+ script tags on some pages), and most of the files used global variables, which created the potential for unanticipated conflict among the files.</p>

<h2>Some background</h2>

<p>The client&#39;s program logic is contained mostly on the server, with relatively little thought given to the client side. Client-side JavaScript is used to implement all kinds of dynamic effects, but the core application logic is on the server. Most of the Javascript (until recently) was written in a somewhat sloppy manner, often by developers who were more familiar with the server side than the client side. The biggest issue was that most variables were declared to be global, and <a href="http://en.wikipedia.org/wiki/Immediately-invoked_function_expression">IIFE</a>s were not used to create local variables. Most variables, however, were declared with var (in the outermost scope, making them global). Thus, we couldn&#39;t be certain that there wouldn&#39;t be an accidental variable name collision between two unrelated files if we concatenated them to reduce the number server requests for Javascript files.</p>

<p>Since there is a lot of Javascript in the project, I needed a way to automatically find problematic variables, rather than reading through the source and trying to understand it. I looked through a number of possibilities to do that, starting with <a href="http://esprima.org/">esprima</a>, and including a number of code coverage tools. In the end I went with the simplest solution, <a href="http://www.JSHint.com/">JSHint</a>, which marks an error when a variable is undefined or implicitly global.</p>

<h2>The workflow</h2>

<p>I started by creating a Python script that would traverse the source tree of javascript files and find all the relevant files. My plan was to wrap each Javascript file in an IIFE, so I had my script check for that IIFE to see if the file has already been dealt with, and output a list of files that still need to be done. Once I had that set up I started going through the files one by one and fixing them.</p>

<p>The goal was to change global variables from being implicit (either because they weren&#39;t declared at all, or because they were declared with var at the outermost scope) to being explicitly assigned to the global object. That way some simple regular expressions could tell what global were assigned to or used in a given file. So I started out by converting all the outermost scope declarations of the form var somevar = &hellip; to global.somevar = &hellip;. Once that was done, I wrapped the entire file in an IIFE like this:</p>

<pre>
(function (global) {
    &hellip;
}(this));</pre>

<p>At this point, I stepped through the JSHint errors, and converted the undeclared and implicitly global variables to be an explicit assignment on the global object. Another effect of using JSHint was that I got all of the JSHint errors as I was going through the file, and could fix a few other things at the same time.</p>

<p>Once I had gone through the all the project&#39;s Javascript files and wrapped them in an IIFE like this, I modified my script to check each file for what happens to the global object. I could then have it check for a few kinds of obvious problems. The biggest problem was if a given global variable was assigned to in more than one file, which could mean that there is a conflict which would cause problems if those files were concatenated. (It could also mean that the variables really were meant to be global, so it was necessary to check each specific case.)</p>

<p>Other problems were with global variables being defined and used in only one file (which probably means they should be local), and global variables that are used but aren&#39;t defined anywhere. Those were secondary problems at this stage, so my script reports them, but we haven&#39;t done anything about them yet.</p>

<h2>Conclusion</h2>

<p>Before I started on this project, I thought it would be very difficult and time consuming to do any significant refactoring on the mess of legacy Javascript in the project. It turns out there are a lot of tools to help with that, and even using some very simple and every day tools like JSHint can do a lot in terms of improving code quality.</p>
